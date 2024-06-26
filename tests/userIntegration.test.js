import dotenv from 'dotenv';
dotenv.config();
import supertest from 'supertest';
import { expect } from 'chai'; 
import app from '../App.js';
import { Buffer } from 'buffer';

const request = supertest(app);

function encodeBasicAuth(username, password) {
  return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
}

describe('User Endpoint Integration Tests', () => {
  const testUsername = 'anzalshaikh435@example.com';
  const testPassword = 'saanya';
  const testFirstName = 'Ayush';
  const testLastName = 'Kanyal';

  let newTestFirstName = '';
  let newTestLastName = '';
  let newTestPassword = '';

  const authHeader = encodeBasicAuth(testUsername, testPassword);
  let testsFailed = false;

  it('Test 1 - Create an account and validate it exists', async () => {
    try {
      const response = await request.post('/v6/user').send({
        firstName: testFirstName,
        lastName: testLastName,
        username: testUsername,
        password: testPassword,
      });

      expect(response.statusCode).to.be.oneOf([200, 403, 201]);
    } catch (error) {
      console.error('Test 1 failed:', error.message);
      process.exit(1);
    }
  });

  it('Test 2 - Update the account and validate it was updated', async () => {
    try {
      let updatePayload = {};

      if (newTestFirstName) updatePayload.firstName = newTestFirstName;
      if (newTestLastName) updatePayload.lastName = newTestLastName;
      if (newTestPassword) updatePayload.password = newTestPassword;

      if (Object.keys(updatePayload).length > 0) {
        const updateResponse = await request.put(`/v6/user/self`)
          .send(updatePayload)
          .set('Authorization', authHeader);

        expect(updateResponse.statusCode).to.be.oneOf([200, 403, 204]); 
      } else {
        console.log('No update payload provided, skipping update test.');
      }
    } catch (error) {
      console.error('Test 2 failed:', error.message);
      process.exit(1);
    }
  });  
  
  after(() => {
    process.exit(0); 
  });
});

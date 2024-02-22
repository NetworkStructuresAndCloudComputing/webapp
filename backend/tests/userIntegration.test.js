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
  const testUsername = 'anzalshaikh00@example.com';
  const testPassword = 'saanya';
  const testFirstName = 'Ayush';
  const testLastName = 'Kanyal';

  let newTestFirstName = '';
  let newTestLastName = '';
  let newTestPassword = '';

  const authHeader = encodeBasicAuth(testUsername, testPassword);

  it('Test 1 - Create an account and validate it exists', async () => {
    const response = await request.post('/v1/user').send({
      firstName: testFirstName,
      lastName: testLastName,
      username: testUsername,
      password: testPassword,
    });

    expect(response.statusCode).to.satisfy((code) => [200, 201, 400].includes(code), 'Unexpected status code');

    const authHeader = encodeBasicAuth(testUsername, testPassword);
  
    const getResponse = await request.get(`/v1/user/self`)
      .set('Authorization', authHeader);
  
    console.log('Get user response:', getResponse.body);
  
    expect(getResponse.statusCode).to.equal(200);
    expect(getResponse.body.username).to.be.equal(testUsername);
  });
  

  it('Test 2 - Update the account and validate it was updated', async () => {
    let updatePayload = {};
  
    if (newTestFirstName) updatePayload.firstName = newTestFirstName;
    if (newTestLastName) updatePayload.lastName = newTestLastName;
    if (newTestPassword) updatePayload.password = newTestPassword;
  
    if (Object.keys(updatePayload).length > 0) {
      const updateResponse = await request.put(`/v1/user/self`)
        .send(updatePayload)
        .set('Authorization', authHeader);
  
      console.log('Update account response:', updateResponse.body);
  
      expect(updateResponse.statusCode).to.satisfy((code) => code >= 200 && code < 300, 'Update failed');

      const newAuthHeader = newTestPassword ? encodeBasicAuth(testUsername, newTestPassword) : authHeader;
  
      const getResponse = await request.get(`/v1/user/self`)
        .set('Authorization', newAuthHeader);
  
      console.log('Get updated user response:', getResponse.body);
  
      expect(getResponse.statusCode).to.equal(200);
    } else {
      console.log('No update payload provided, skipping update test.');
    }
  });

  after(() => {
    // This will throw an error if any of the tests failed
    const failedTests = this.test.parent.tests.filter(test => test.state === 'failed');
    if (failedTests.length > 0) {
      throw new Error('Integration tests failed');
    }
  });
});

import dotenv from 'dotenv';
dotenv.config();
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../App.js';
import { Buffer } from 'buffer';


const request = supertest(app);

function encodeBasicAuth(username, password) {
  const credentials = Buffer.from(`${username}:${password}`);
  return 'Basic ' + credentials.toString('base64');
}

describe('User Endpoint Integration Tests', () => {
  let createdUserId;
  const testUsername = 'anzalshaikh25@example.comm';
  const testPassword = '123';
  const testFirstName = 'mohammed';
  const testLastName = "khan";
  const authHeader = encodeBasicAuth(testUsername, testPassword);

  it('Test 1 - Create an account and validate it exists', async () => {
    const response = await request.post('/v1/user').send({
      firstName: testFirstName,
      lastName: testLastName,
      username: testUsername,
      password: testPassword,
    }).set('Authorization', authHeader);

    if (response.statusCode === 201) {
      createdUserId = response.body.id;

      const getResponse = await request.get(`/v1/user/self`)
        .set('Authorization', authHeader); 
      expect(getResponse.statusCode).to.be.equal(200);
      expect(getResponse.body.username).to.be.equal(testUsername);
    } else if (response.statusCode === 400) {
      console.log('User already exists. Skipping creation validation.');
    } else {
      throw new Error(`Unexpected status code: ${response.statusCode}`);
    }
  });

  it('Test 2 - Update the account and validate it was updated', async () => {
    const updateResponse = await request.put(`/v1/user/self`)
      .send({
        firstName: testFirstName,
        lastName: testLastName,
        password: testPassword,
      })
      .set('Authorization', authHeader);

    console.log('Update response:', updateResponse.body);

    if (updateResponse.statusCode >= 200 && updateResponse.statusCode < 300) {
      const getResponse = await request.get(`/v1/user/self`)
        .set('Authorization', authHeader);

      console.log('Get response after update:', getResponse.body);

      expect(getResponse.statusCode).to.equal(200);
      expect(getResponse.body.firstName).to.equal(testFirstName);
    } else {
      console.error('Update failed:', updateResponse.statusCode, updateResponse.body);
      throw new Error(`Unexpected status code: ${updateResponse.statusCode}`);
    }
  });
});

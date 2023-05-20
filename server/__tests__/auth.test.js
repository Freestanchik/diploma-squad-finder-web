import request from 'supertest';
import authService from '../services/authService.js';
import app from "../app.js";

jest.mock('../services/authService.js');

describe('Auth Controller', () => {
    test('should register a user', async () => {
        const reqBody = {
            login: 'testuser',
            email: 'test@example.com',
            password: 'test123',
        };

        authService.registerUser.mockResolvedValue('mockToken');

        const response = await request(app)
            .post('/api//auth/register')
            .send(reqBody)
            .expect(201);

        expect(authService.registerUser).toHaveBeenCalledWith(
            reqBody.login,
            reqBody.email,
            reqBody.password
        );
        expect(response.body).toEqual('mockToken');
    });
});
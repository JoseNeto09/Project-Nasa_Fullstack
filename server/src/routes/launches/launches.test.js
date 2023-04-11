const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () =>{
    test('It should respond with 200 sucess', async() =>{
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        expect(200);
        expoct(response.body)
    });
});

describe('Test Post /launch', () =>{

    const completeLaunchData = {
        mission: 'USS entreprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-185-f',
        launchDate: 'January 4, 2028',
    };
    const launchDataWithoutDate = {
        mission: 'USS entreprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-185-f',
    }

    test('It should respond with 201 created', async () =>{
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        const requestDate =  new Date (completeLaunchData.launchDate).valueOf();
        const responseDate = new Date (response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);
    }); 

    test('It should catch missing required properties', () => {});
    test('It should catch missing invalid dates', () =>{});
})
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/job-search-test';
require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);

describe('REST API 3 resource', () => {
    before(() => connection.dropDatabase());

    let brad = {
        name: 'Brad Pitt', 
        difficult: true, 
        age: 53
    };

    it('saves an actor', () => {

        return request.post('/api/actors')
            .send(brad)
            .then( res => {
                let actor = res.body;
                assert.isOk(actor._id);
                assert.deepEqual(actor.name, brad.name);
            });
    });

    it('gets actor by id', () => {
       
        let actor = null;

        return request.post('/api/actors')
            .send(brad)
            .then( res => {
                actor = res.body;
                return request.get(`/api/actors/${actor._id}`);
            })
            .then( res => {
                assert.deepEqual(res.body, actor);
            });
        
    });

    it.skip('deletes an actor by id', () => {
        let actor = null;
        return request.post('/api/actors')
            .send(brad)

            .then(res => {
                actor = res.body;
                return request.delete(`/api/actors/${actor._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true});
                return request.get(`/api/actors/${actor._id}`);
            })
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

});
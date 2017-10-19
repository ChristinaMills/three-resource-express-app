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

    let newActor = {
        name: 'Brad Pitt', 
        difficult: true, 
        age: 53
    };

    it('saves an actor', () => {

        return request.post('/api/actors')
            .send(newActor)
            .then( res => {
                let actor = res.body;
                assert.isOk(actor._id);
                assert.deepEqual(actor.name, newActor.name);
            });
    });

    it('gets actor by id', () => {
       
        let actor = null;

        return request.post('/api/actors')
            .send(newActor)
            .then( res => {
                actor = res.body;
                return request.get(`/api/actors/${actor._id}`);
            })
            .then( res => {
                assert.deepEqual(res.body, actor);
            });
        
    });

});
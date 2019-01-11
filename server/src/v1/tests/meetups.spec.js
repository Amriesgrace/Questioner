import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../../app';

const { expect } = chai;
chai.use(chaiHttp);


// test for endpoint to get all meetup records

describe('/GET meetups', () => {
    // GET - List all meetups
    it('should return all meetups', (done) => {
        chai.request(app)
            .get('/api/v1/meetups')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

// test for endpoint to get all upcoming meetups
describe('/GET meetups/upcoming', () => {
    // GET - List all meetups
    it('should return all meetups', (done) => {
        chai.request(app)
            .get('/api/v1/meetups/upcoming')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

// test for endpoint to post rsvp status
describe('/POST RSVP status', () => {
    it('should post RSVP status for a specific meetup with id', (done) => {
        chai.request(app)
            .post('/api/v1/meetups/1/rsvp')
            .send({
                meetupId: 1011,
                topic: 'dumbledores army',
                rsvp: 'yes',
            })
            .end((err, res) => {
                expect(res.body.status).to.equal(201);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

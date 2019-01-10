import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../../app';

const { expect } = chai;
chai.use(chaiHttp);

const attendingStatus = [];

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
    it('it should have a status 404 if meetup not available', (done) => {
        chai.request(app)
            .get('/api/v1/meetups')
            .end((error, res) => {
                expect(res).to.have.status(404);
                done();
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
    // POST - rsvp status
    it('should post RSVP status for a specific meetup with id', (done) => {
        chai.request(app)
            .post('/api/v1/meetups/:id/rsvp')
            .send({ 
                "meetupId": 10012,
                "topic": 'dumbledores army',
                "status": "yes",
            })
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res).to.have.status(201);
                expect(res.body.success).to.equal('true');
                expect(res.body).should.be.a('object');
                done();
            });
    });
});

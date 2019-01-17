import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../../app';

const { expect } = chai;
chai.use(chaiHttp);


describe('/GET meetups', () => {
    it('should return all meetups', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'chris@gmail.com',
                password: 'gcpring'
            })
            .end((err, res) => {
                const {token} = res.body;
                chai.request(app)
                .get('/api/v1/meetups')
                .set('accesstoken', token)
                .end((error, data) => {
                    expect(data).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    
                });

            });
            done();
    });
});

describe('/get upcoming', () => {
    it('should return upcoming meetups', (done) => {
        chai.request(app).post('/api/v1/auth/login')
        .send({
            email: 'chris@gmail.com',
            password: 'gcpring'
        })
        .end((err, res) => {
            const {token} = res.body;
            chai.request(app)
            .get('/api/v1/meetups/upcoming')
            .set('accesstoken', token)
            .end((error, data) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
            });
        });done();
    });
});
describe('get specific meetup', () => {
    it('should return a specific meetup', (done) => {
        chai.request(app).post('/api/v1/auth/login')
        .send({
            email: 'chris@gmail.com',
            password: 'gcpring'
        })
        .end((err, res) => {
            const { token } = res.body;
            chai.request(app)
            .get('/api/v1/meetups/1')
            .set('accesstoken', token)
            .end((error, data) => {
                expect(data).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(1).to.equal(data.body.id);
                
            });
        }); done();
    });
});
describe('should return 404 status if meetup is unavailable', () => {
    it('should have a status 404 if meetup is not available', (done) => {
        chai.request(app).post('/api/v1/auth/login')
        .send({
            email: 'chris@gmail.com',
            password: 'gcpring'
        })
        .end((err, res) => {
            const { token } = res.body;
            chai.request(app)
            .get('/api/v1/meetups/10000')
            .set('accesstoken', token)
            .end((error, data) => {
                expect(data).to.have.status(404);
            });
        });done();
    });
});

describe('/POST RSVP status', () => {
    it('should post RSVP status for a specific meetup with id', (done) => {
        chai.request(app).post('/api/v1/auth/login')
        .send({
            email: 'chris@gmail.com',
            password: 'gcpring'
        })
        .end((err, res) => {
            const { token } = res.body;
            chai.request(app)
            .post('/api/v1/meetups/1/rsvp')
            .send({
                meetupId: 1011,
                topic: 'dumbledores army',
                rsvp: 'yes',
            })
            .end((error, data) => {
                expect(data).to.have.status(200);
                expect(res.body).to.be.an('object');
            })
        })
        done();
    });
});

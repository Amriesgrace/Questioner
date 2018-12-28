import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../app';

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
// describe('/POST meetups/:id/rsvp', () => {
//     // POST - rsvp status
//     it('should post rsvp status for a meetup with a specific id', (done) => {
//         chai.request(app)
//             .post('/api/v1/meetups/:id/rsvp')
//             .send({
//                 data: {
//                     meetupId: 10012,
//                     topic: 'meetup topic',
//                     status: 'maybe'
//                 }
//             })
//             .end((err, res) => {
//                 expect(res).to.have.status(201);
//                 expect(res.body).to.be.an('array');
//                 done();
//             });
//     });
// });

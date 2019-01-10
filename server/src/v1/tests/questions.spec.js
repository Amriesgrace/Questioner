import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../../app';

const { expect } = chai;
chai.use(chaiHttp);



// test for endpoint 
// describe('/GET meetups', () => {
//     // GET - List all meetups
//     it('should return all meetups', (done) => {
//         chai.request(app)
//             .get('/api/v1/meetups')
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.an('object');
//                 done();
//             });
//     });
// });

// test for endpoint to get all upcoming meetups


// test for endpoint to post a question
 describe('/POST a question', () => {
    // POST - question
    it('should post a question about a meetup', (done) => {
        const question = {
            id: 3,
            username: 'Grace',
            title: 'grumpy hagrid',
            question: 'what to do about this',
        };
        chai.request(app)
            .post('/api/v1/question')
            .send({ data: [question] })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.success).to.equal('true');
                expect(res.body).should.be.a('object');
                done();
            });
    });
}
/*
describe('/PATCH question/upvote', () => {
    // vote on  a question
    it('should increase the number of votes by 1', (done) => {
        const id = 1;
        const voteResult = {
            meetup: 1011,
            title: 'meetup title',
            question: 'question about the meetup',
            votes: 2,
        };
        chai.request(app)
            .patch(`/api/v1/question/${id}/upvote`)
            .send(voteResult)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

describe('/PATCH question/downvote', () => {
    // vote on  a question
    it('should increase the number of votes by 1', (done) => {
        const id = 1;
        const voteResult = {
            meetup: 1011,
            title: 'meetup title',
            question: 'question about the meetup',
            votes: 2,
        };
        chai.request(app)
            .patch(`/api/v1/question/${id}/upvote`)
            .send(voteResult)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
*/
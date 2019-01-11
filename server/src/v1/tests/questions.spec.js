import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../../../app';

const { expect } = chai;
chai.use(chaiHttp);



describe('/POST a question', () => {
    it('should post a question about a meetup', (done) => {
        const question = {
            id: 3,
            username: 'Grace',
            title: 'grumpy hagrid',
            question: 'what to do about this',
        };
        chai.request(app)
            .post('/api/v1/question')
            .send(question)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

describe('/PATCH question/upvote', () => {
    it('should increase the number of votes by 1', (done) => {
        const voteResult = {
            meetup: 1011,
            title: 'meetup title',
            question: 'question about the meetup',
            votes: 2,
        };
        chai.request(app)
            .patch('/api/v1/question/1/upvote')
            .send(voteResult)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

describe('/PATCH question/downvote', () => {
    it('should reduce the number of votes by 1', (done) => {
        const voteResult = {
            meetup: 1011,
            title: 'meetup title',
            question: 'question about the meetup',
            votes: 1,
        };
        chai.request(app)
            .patch('/api/v1/question/1/downvote')
            .send(voteResult)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

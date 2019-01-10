import express from 'express';
import Meetups from '../controllers/api/meetup';
import Questions from '../controllers/api/question';
import Validation from '../middleware/validation';

const router = express.Router();


// route to get homepage
router.get('/', (req, res) => {
    res.send('Welcome to questioner.Register to get started');
});

// get all meetups
router.get('/api/v1/meetups', Meetups.getMeetups);

// get upcoming meetups
router.get('/api/v1/meetups/upcoming', Meetups.getUpcoming);

// rsvp to a meetup
router.post('/api/v1/meetups/:id/rsvp', Meetups.rsvp);

// create a question
router.post('/api/v1/question', Questions.createQuestion);

// upvote a question
router.patch('/api/v1/question/:id/upvote', Questions.upvote);

// downvote a question
router.patch('/api/v1/question/:id/downvote', Questions.downvote);




export default router;
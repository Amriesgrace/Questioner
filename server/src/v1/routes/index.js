import express from 'express';
import Meetups from '../controllers/meetup';
import Questions from '../controllers/question';
// import Validation from '../middleware/Validation';

const router = express.Router();


// route to get homepage
router.get('/', (req, res) => {
    res.send('Welcome to questioner.Register to get started');
});


// get all meetups
router.get('/api/v1/meetups', Meetups.getMeetups);

// get upcoming meetups
router.get('/api/v1/meetups/upcoming', Meetups.getUpcoming);

// get a specific meetup
router.get('/api/v1/meetups/:id', Meetups.getMeetup);

// rsvp to a meetup
router.post('/api/v1/meetups/:id/rsvp', Meetups.rsvp);

// create a meetups
router.post('/api/v1/meetups', Meetups.createMeetup);

// create a question
router.post('/api/v1/question', Questions.createQuestion);

// upvote a question
router.patch('/api/v1/question/:id/upvote', Questions.upvote);

// downvote a question
router.patch('/api/v1/question/:id/downvote', Questions.downvote);




export default router;

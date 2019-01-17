import express from 'express';
import Meetups from '../controllers/meetup';
import Questions from '../controllers/question';
import Users from '../controllers/users';
import Validation from '../middleware/check-validation';
import checkAuth from '../middleware/Auth';

const router = express.Router();


// route to get homepage
router.get('/', (req, res) => {
    res.send('Welcome to questioner.Register to get started');
});

router.post('/api/v1/meetups', checkAuth.verifyUser, Meetups.createMeetup);

// get upcoming meetups
router.get('/api/v1/meetups/upcoming', checkAuth.verifyUser, Meetups.getUpcoming);

// get all meetups
router.get('/api/v1/meetups', checkAuth.verifyUser, Meetups.getMeetups);

// get a specific meetup
router.get('/api/v1/meetups/:id', checkAuth.verifyUser, Meetups.getMeetup);

// create a question
router.post('/api/v1/question', Validation.validateQuestionInput, checkAuth.verifyUser, Questions.createQuestion);

// rsvp to a meetup
router.post('/api/v1/meetups/:id/rsvp', checkAuth.verifyUser, Meetups.rsvp);

// upvote a question
router.patch('/api/v1/question/:id/upvote', checkAuth.verifyUser, Questions.upvote);

// downvote a question
router.patch('/api/v1/question/:id/downvote', checkAuth.verifyUser, Questions.downvote);

// login user
router.post('/api/v1/auth/login', Users.loginUser);

// create users
router.post('/api/v1/auth/signup', Users.createUser);



export default router;

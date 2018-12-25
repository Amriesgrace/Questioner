import express from 'express';
import Meetups from '../controllers/api/v1/meetups/meetup';
import Questions from '../controllers/api/v1/questions/questions';

const router = express.Router();


// route to get homepage
router.get('/', (req, res) => {
    res.send('Welcome to questioner.Register to get started');
});

// get all meetups
router.get('/api/v1/meetups', Meetups.getMeetups);

// get upcoming meetups
router.get('/api/v1/meetups/upcoming', Meetups.getUpcoming);

export default router;

import express from 'express';
import Meetups from '../controllers/api/v1/meetups/meetup';

const router = express.Router();


// route to get homepage
router.get('/', (req, res) => {
    res.send('Welcome to questioner.Register to get started');
});

// get all meetups
router.get('/api/v1/meetups', Meetups.getMeetups);

export default router;

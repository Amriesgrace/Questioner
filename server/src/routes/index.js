import express from 'express';

const router = express.Router();


// route to get homepage
router.get('/', (req, res) => {
    res.send('Welcome to questioner.Register to get started');
});

export default router;

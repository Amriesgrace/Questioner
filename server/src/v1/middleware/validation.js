
const validateParamId = (req, res, next) => {
    const reqId = req.params.id;
    if (typeof reqId === 'string') {
        return res.status(403).json({
            status: res.statusCode,
            message: 'You entered a letter id use numbers instead'
        });
    }
    return next();
};

const validateRsvp = (req, res, next) => {
    if (!req) {
        return res.status(400).json({
            success: false,
            message: 'The request req should not be empty'
        });
    }
    if (!Number(req.meetupId)) {
        return res.status(400).json({
            success: false,
            message: 'The meetupId has to be a number'
        });
    }
    if (!String(req.topic)) {
        return res.status(400).json({
            success: false,
            message: 'The topc should be a string'
        });
    }
    if (!String(req.rsvp)) {
        return res.status(400).json({
            success: false,
            message: 'Your rsvp status shoulv be a string',
        });
    }
    if (!req.meetupId || !req.topic || !req.rsvp) {
        return res.status(400).json({
            success: false,
            message: ' one of your fields is empty'
        });
    }
    return next();
};

const validateQuestionInput = (req, res, next) => {
    if (!req) {
        return res.status(400).json({
            success: false,
            message: 'The request should not be empty'
        });
    }
    if (!Number(req.id)) {
        return res.status(400).json({
            success: false,
            message: 'The id has to be a number'
        });
    }
    if (!String(req.username)) {
        return res.status(400).json({
            success: false,
            message: 'The username should be a string'
        });
    }
    if (!String(req.title)) {
        return res.status(400).json({
            success: false,
            message: 'Your question title should be a string',
        });
    }
    if (!String(req.question)) {
        return res.status(400).json({
            success: false,
            message: 'Your question body should be a string',
        });
    }
    if (!req.id || !req.username || !req.title || !req.question) {
        return res.status(400).json({
            success: false,
            message: ' one of your fields is empty'
        });
    }
    return next();
};

const validateUpvote = (req, res, next) => {
    if (!req) {
        return res.status(400).json({
            success: false,
            message: 'The request body should not be empty'
        });
    }
    if (!Number(req.id)) {
        return res.status(400).json({
            success: false,
            message: 'The id has to be a number'
        });
    }
    if (!String(req.question)) {
        return res.status(400).json({
            success: false,
            message: 'The question should be a string'
        });
    }
    if (!Number(req.votes)) {
        return res.status(400).json({
            success: false,
            message: 'Your votes should be a number',
        });
    }
    if (!req.id || !req.title || !req.question || !req.votes) {
        return res.status(400).json({
            success: false,
            message: ' one of your fields is empty'
        });
    }
    return next();
};

const validatedownvote = (req, res, next) => {
    if (!req) {
        return res.status(400).json({
            success: false,
            message: 'The request body should not be empty'
        });
    }
    if (!Number(req.id)) {
        return res.status(400).json({
            success: false,
            message: 'The downvote id has to be a number'
        });
    }
    if (!String(req.question)) {
        return res.status(400).json({
            success: false,
            message: 'The question should be a string'
        });
    }
    if (!Number(req.votes)) {
        return res.status(400).json({
            success: false,
            message: 'Your votes should be a number',
        });
    }
    if (!req.id || !req.title || !req.question || !req.votes) {
        return res.status(400).json({
            success: false,
            message: ' one of your fields is empty'
        });
    }
    return next();
};

const validate = {
    validateParamId,
    validateRsvp,
    validateQuestionInput,
    validateUpvote,
    validatedownvote,
};

export default validate;

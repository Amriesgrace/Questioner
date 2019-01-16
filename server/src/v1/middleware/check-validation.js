
const validateParamId = (req, res, next) => {
    const reqId = Number(req.params.id);
    if (typeof reqId === 'string') {
        return res.status(403).json({
            status: res.statusCode,
            message: 'You entered a letter id, use numbers instead'
        });
    }
    return next();
};

const validateRsvp = (req, res, next) => {
    const { status } = req.body;
    if (!String(status)) {
        return res.status(400).json({
            success: false,
            message: 'Your rsvp status shoulv be a string',
        });
    }
    return next();
};

const validateQuestionInput = (req, res, next) => {
    const { title, username, question } = req.body;
    if (!String(username)) {
        return res.status(400).json({
            success: false,
            message: 'The username should be a string'
        });
    }
    if (!String(title)) {
        return res.status(400).json({
            success: false,
            message: 'Your question title should be a string',
        });
    }
    if (!String(question)) {
        return res.status(400).json({
            success: false,
            message: 'Your question body should be a string',
        });
    }
    if (!username || !title || !question) {
        return res.status(400).json({
            success: false,
            message: ' one of your fields is empty'
        });
    }
    return next();
};

const validateUpvote = (req, res, next) => {
    const reqId = Number(req.params.id);
    if (String(reqId)) {
        return res.status(400).json({
            success: false,
            message: 'The downvote id has to be a number'
        });
    }
    return next();
};

const validatedownvote = (req, res, next) => {
    const reqId = Number(req.params.id);
    if (String(reqId)) {
        return res.status(400).json({
            success: false,
            message: 'The downvote id has to be a number'
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

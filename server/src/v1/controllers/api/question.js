import AllQuestions from '../../models/questionsRecord';

/**
 * @function createQuestion
 *
 * Create a question on route api/v1/question
 *
 * @param  {object} req
 * @param  {object} res
 */
const createQuestion = (req, res) => {
    const newQuestion = {
        id: AllQuestions.length + 1,
        username: req.body.username,
        title: req.body.title,
        question: req.body.question
    };
    AllQuestions.push(newQuestion);

    return res.status(201).json({
        status: res.statusCode,
        message: 'new question posted',
        success: true,
        data: newQuestion,
    });
};

/**
 * @function upvote
 *
 * Upvotes a question
 *
 * @param  {object} req
 * @param  {object} res
 */
const upvote = (req, res) => {
    const reqId = req.params.id;
    const result = AllQuestions.find(question => question.id === Number(reqId));
    if (!result) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: 'no question with this id',
        });
    }
    const newResult = {
        votes: result.votes + 1,
    };
    return res.status(200).json({
        status: 200,
        data: [newResult],
        success: true,
    });
};

/**
 * @function downvote
 *
 * downvotes a question
 *
 * @param  {object} req
 * @param  {object} res
 *
 */
const downvote = (req, res) => {
    const reqId = req.params.id;
    const result = AllQuestions.find(question => question.id === Number(reqId));
    if (result) {
        const newResult = {
            id: result.questionId,
            title: result.title,
            question: result.body,
            votes: result.votes - 1,
        };
        AllQuestions.push(newResult);
        return res.status(200).json({
            status: 200,
            data: [newResult],
            success: true
        });
    }
    return res.status(404).json({
        status: 404,
        message: 'no question with this id',
    });
};


const Questions = {
    createQuestion,
    upvote,
    downvote,
};

export default Questions;

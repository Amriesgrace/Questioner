import AllQuestions from '../../../../models/questionsRecord';


const createQuestion = (req, res) => {
    const newQuestion = {
        id: AllQuestions.length + 1,
        username: req.body.username,
        title: req.body.title,
        question: req.body.question,
    };
    AllQuestions.push(newQuestion);

    res.status(201).json({
        status: 201,
        message: 'new question posted',
        data: newQuestion,
    });
};


const upvote = (req, res) => {
    const reqId = req.params.id;
    const result = AllQuestions.find(question => question.id == reqId);
    if (result) {
        const newResult = {
            meetup: result.meetupId,
            title: result.title,
            question: result.body,
            votes: result.votes + 1,
        };
        res.status(200).json({
            status: 200,
            data: [newResult],
            // vote: newResult,
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'no question with this id',
        });
    }
};


const downvote = (req, res) => {
    const reqId = req.params.id;
    const result = AllQuestions.find(question => question.id == reqId);
    if (result) {
        const newResult = {
            meetup: result.meetupId,
            title: result.title,
            question: result.body,
            votes: result.votes - 1,
        };
        AllQuestions.push(newResult);
        res.status(200).json({
            status: 200,
            data: [newResult],
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'no question with this id',
        });
    }
};


const Questions = {
    createQuestion,
    upvote,
    downvote,
};

export default Questions;

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

const Questions = {
    createQuestion,
};

export default Questions;

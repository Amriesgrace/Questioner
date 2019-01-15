

const createQuestion = (req, res) => {
    const sqlQueryString = `INSERT INTO questions (created_on, created_by, meetup_id, title, question_body, votes)
                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
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
            status: res.statusCode,
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

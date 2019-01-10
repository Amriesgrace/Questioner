import AllQuestions from '../../models/questionsRecord';

/**
 * @param  {} req
 * @param  {} res
 * @param  {AllQuestions.length+1} =>{constnewQuestion={id
 * @param  {req.body.username} username
 * @param  {req.body.title} title
 * @param  {req.body.question} question
 * @param  {} };AllQuestions.push(newQuestion
 * @param  {} ;res.status(201
 * @param  {res.statusCode} .json({status
 * @param  {'newquestionposted'} message
 * @param  {newQuestion} data
 * @param  {} }
 */
const createQuestion = (req, res) => {
    const newQuestion = {
        id: AllQuestions.length + 1,
        username: req.body.username,
        title: req.body.title,
        question: req.body.question
    };
    AllQuestions.push(newQuestion);

    res.status(201).json({
        status: res.statusCode,
        message: 'new question posted',
        data: newQuestion,
    });
};

/**
 * @param  {} req
 * @param  {} res
 * @param  {} =>{constreqId=req.params.id;constresult=AllQuestions.find(question=>question.id==reqId
 * @param  {} ;if(result
 * @param  {result.meetupId} {constnewResult={meetup
 * @param  {result.title} title
 * @param  {result.body} question
 * @param  {result.votes+1} votes
 * @param  {} };res.status(200
 * @param  {res.statusCode} .json({status
 * @param  {[newResult]} data
 * @param  {} }
 * @param  {} ;}else{res.status(404
 * @param  {404} .json({status
 * @param  {'noquestionwiththisid'} message
 * @param  {} }
 */
const upvote = (req, res) => {
    const reqId = req.params.id;
    const result = AllQuestions.find(question => Number(question.id) === reqId);
    if (result) {
        const newResult = {
            id: result.questionId,
            title: result.title,
            question: result.body,
            votes: result.votes + 1,
        };
        res.status(200).json({
            status: res.statusCode,
            data: [newResult]
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'no question with this id',
        });
    }
};

/**
 * @param  {} req
 * @param  {} res
 * @param  {} =>{constreqId=req.params.id;constresult=AllQuestions.find(question=>question.id==reqId
 * @param  {} ;if(result
 * @param  {result.meetupId} {constnewResult={meetup
 * @param  {result.title} title
 * @param  {result.body} question
 * @param  {result.votes-1} votes
 * @param  {} };AllQuestions.push(newResult
 * @param  {} ;res.status(200
 * @param  {200} .json({status
 * @param  {[newResult]} data
 * @param  {} }
 * @param  {} ;}else{res.status(404
 * @param  {404} .json({status
 * @param  {'noquestionwiththisid'} message
 * @param  {} }
 */
const downvote = (req, res) => {
    const reqId = req.params.id;
    const result = AllQuestions.find(question => Number(question.id) === reqId);
    if (result) {
        const newResult = {
            id: result.questionId,
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

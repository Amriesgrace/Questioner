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

    return res.status(201).json({
        status: res.statusCode,
        message: 'new question posted',
        success: true,
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

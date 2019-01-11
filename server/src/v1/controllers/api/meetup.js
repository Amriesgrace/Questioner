import AllMeetups from '../../models/meetupRecord';

/**
 * @param  {} req
 * @param  {} res
 * @param  {} =>{res.status(200
 * @param  {200} .json({status
 * @param  {true} success
 * @param  {{AllMeetups}}} data
 */
const getMeetups = (req, res) => {
    return res.status(200).json({
        status: 200,
        success: true,
        data: {
            AllMeetups
        }
    });
};
/**
 * @param  {} req
 * @param  {} res
 * @param  {} =>{res.status(200
 * @param  {200} .json({status
 * @param  {true} success
 * @param  {{AllMeetups} data
 * @param  {} }}
 */
const getUpcoming = (req, res) => {
    return res.status(200).json({
        status: 200,
        success: true,
        data: {
            AllMeetups,
        }
    });
};
/**
 * @param  {} req
 * @param  {} res
 * @param  {} =>{constreqId=req.params.id;constresult=AllMeetups.find(meetup=>Number(meetup.id
 * @param  {} ==reqId
 * @param  {} ;if(result
 * @param  {result.meetupId} {constrsvpStatus={meetupId
 * @param  {result.topic} topic
 * @param  {req.body.rsvp};AllMeetups.push(rsvpStatus} status
 */
const rsvp = (req, res) => {
    const reqId = req.params.id;
    const result = AllMeetups.find(meetup => meetup.id === Number(reqId));

    if (!result) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: 'Unable to find meetup with this id'
        });
    }
    const rsvpStatus = {
        meetupId: result.meetupId,
        topic: result.topic,
        rsvp: req.body.rsvp
    };
    AllMeetups.push(rsvpStatus);
    return res.status(201).json({
        status: 201,
        success: true,
        message: 'Your rsvp status',
        data: [rsvpStatus]
    });
};



const meetup = {
    getMeetups,
    getUpcoming,
    rsvp,
};

export default meetup;

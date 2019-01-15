import AllMeetups from '../../models/meetupRecord';

/**
 * @function getMeetups
 *
 * Handles get request for route api/v1/meetups
 *
 * @param  {object} req
 * @param  {object} res
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
 * @function getUpcoming
 *
 * Handles get request for route api/v1/meetups/upcoming
 *
 * @param  {object} req
 * @param  {object} res
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
 * @function rsvp
 *
 * Post rsvp to route api/v1/meetups/rsvp
 *
 * @param  {object} req
 * @param  {object} res
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

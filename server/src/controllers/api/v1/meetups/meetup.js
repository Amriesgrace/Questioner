// import express from 'express';
import AllMeetups from '../../../../models/meetupRecord';


const getMeetups = (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        data: {
            AllMeetups
        }
    });
};

const getUpcoming = (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        data: {
            AllMeetups,
        }
    });
};

const rsvp = (req,res) => {
    const reqId = req.params.id;
    const result = AllMeetups.find(meetup => meetup.id == reqId);

    if (result) {
        const rsvpStatus = {
            meetupId: result.meetupId,
            topic: result.topic,
            status: req.body.rsvp
        }
        AllMeetups.push(rsvpStatus);
        res.status(201).json({
            status: 201,
            message: 'Your rsvp status',
            data: [rsvpStatus]
        });
    } else {
        res.status(401).json({
            status: 401,
            message: 'Unable to find meetup with this id'
        })
    }
}


const meetup = {
    getMeetups,
    getUpcoming,
    rsvp,
};

export default meetup;

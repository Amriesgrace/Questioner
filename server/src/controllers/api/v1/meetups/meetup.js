// import express from 'express';
import meetupRecord from '../../../../models/meetupRecord';


const getMeetups = (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        data: {
            meetupRecord
        }
    });
};

const getUpcoming = (req, res) => {
    // const meetupDate = meetupRecord.filter(meetupdate => meetupdate > meetupRecord.createdOn);
    // console.log(meetupDate);
    // console.log(meetupDate.id);
    // console.log(meetupDate.topic);

    res.status(200).json({
        status: 200,
        success: true,
        data: {
            meetupRecord,
        }
    });
};


const meetup = {
    getMeetups,
    getUpcoming,
};

export default meetup;

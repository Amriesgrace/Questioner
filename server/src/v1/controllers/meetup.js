
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    connectionString: process.env.DATABASE_URL
});
client.connect((err) => {
    if (err) {
        console.error('connection error ', err.stack);
    }
    console.log('connected to db');
});

/**
 * @function createMeetup
 *
 * Handles query to create a new meetup
 * @param  {object} req
 * @param  {object} res
 */
const createMeetup = (req, res) => {
    const sqlQueryString = `INSERT INTO meetups (location, topic, images, tags, happeningon)
                            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
        req.body.location,
        req.body.topic,
        req.body.images,
        req.body.tags,
        req.body.happeningOn,
    ];
    client.query(sqlQueryString, values, (error, result) => {
        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.message
            });
        }
        return res.status(201).json({
            status: 201,
            data: result.rows
        });
    });
    // client.end();
};


/**
 * @function getMeetups
 * @param  {} req
 * @param  {} res
 */
const getMeetups = (req, res) => {
    const sqlQueryString = 'SELECT * FROM meetups';
    client.query(sqlQueryString, (err, response) => {
        if (response.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: 'You have no meetups'
            });
        }
        return res.status(200).json({
            status: 200,
            data: [response.rows]
        });
    });
};


/*
* Get a specific meetup
*/

const getMeetup = (req, res) => {
    const reqId = req.params.id;
    const sqlQueryString = 'SELECT * FROM meetups where id = $1';
    client.query(sqlQueryString, [reqId], (err, result) => {
        if (result.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: 'There are no meetups with this id'
            });
        }
        return res.status(200).json({
            status: 200,
            data: [result.rows]
        });
    });
};


/**
 * @function getUpcoming
 *
 * Handles query for upcoming meetups
 *
 * @param  {object} req
 * @param  {object} res
 *
 */
const getUpcoming = (req, res) => {
    const sqlQueryString = 'SELECT * FROM meetups where happeningon >= NOW()';
    client.query(sqlQueryString, (err, response) => {
        if (response.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No upcoming meetups'
            });
        }
        return res.status(200).json({
            status: 200,
            data: [response.rows]
        });
    });
};

/*
* RSVP to a meetup
*/
const rsvp = (req, res) => {
    const reqId = req.params.id;
    const fetchMeetups = 'SELECT * FROM meetups where id = $1';
    const sqlQueryString = 'INSERT INTO rsvp(title, response) VALUES ($1, $2) RETURNING *';
    client.query(fetchMeetups, [reqId], (err, response) => {
        if (response.rowCount === 0) {
            res.status(404).json({
                status: 404,
                message: 'Unable to find your meetup'
            });
        }
        res.status(200).json({
            status: 200,
            data: response.rows
        });
        const newdata = {
            topic: response.rows[0].topic,
        };
        const values = [
            newdata.topic,
            req.body.rsvp
        ];
        console.log(newdata);
        client.query(sqlQueryString, values, (error, result) => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    message: 'Unable to add status'
                });
            }
            return res.status(201).json({
                status: res.statusCode,
                message: 'Status added',
                data: [newdata.meetupId, result.rows]
            });
        });
    });
};


const meetup = {
    getMeetups,
    getMeetup,
    getUpcoming,
    createMeetup,
    rsvp
};

export default meetup;

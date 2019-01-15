import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
// DATABASE_URL=postgres://eifxybxa:xMXVtAb8PTPy8oesrdlaINb6heHO_-fN@dumbo.db.elephantsql.com:5432/eifxybxa
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect((err) => {
    if (err) {
        console.error('connection error ', err.stack);
    }
    console.log('connected to db');
});

/*
* Creates database questionerdb
* Creates table to store data for meetups
*
*/

const createDatabaseQuestioner = () => {
    const queryString = 'CREATE DATABASE questionerdb';
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        } else {
            client.end();
        }
    });
};

const createMeetupsTable = () => {
    const queryString = `
        CREATE TABLE meetups (
            id serial PRIMARY KEY,
            title character varying(50),
            location text,
            created_on date,
            topic text,
            images text,
            tags text,
            happening_on date
        )`;
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        }
        console.log(res, 'meetups table created');
    });
};
const createQuestionsTable = () => {
    const queryString = `
        CREATE TABLE questions (
            id serial PRIMARY KEY, 
            created_on date,
            created_by int,
            meetup_id int,
            title character varying(50),
            question_body text NOT NULL,
            votes int
        )`;
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        }
        console.log(res, 'questions table created');
    });
};

const createUsersTable = () => {
    const queryString = `
        CREATE TABLE users(
            id serial PRIMARY KEY,
            first_name character varying(50),
            last_name character varying(50),
            other_name character varying(50),
            email text,
            phone_number int,
            user_name character varying(50),
            registered date,
            is_admin boolean
        )
    `;
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        }
        console.log(res, 'users table created');
    });
};
const rsvpTable = () => {
    const queryString = `
        CREATE TABLE rsvp(
            id serial PRIMARY KEY, 
            meetup_id INTEGER NOT NULL REFERENCES meetups, 
            user_id INTEGER NOT NULL REFERENCES users, 
            response character varying(20)
        )`;
    client.query(queryString, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res, 'rsvp table create');
        }
    });
};

const deleteMeetupTable = () => {
    const queryString = 'DROP TABLE meetups';
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log(res, 'meetup table deleted');
        }
    });
};
const deleteQuestionsTable = () => {
    const queryString = 'DROP TABLE meetups';
    client.query(queryString, (err, res) => {
        if (err) {
            client.end();
            console.log(res, 'questions table deleted');
        }
    });
};

createDatabaseQuestioner();
createMeetupsTable();
createQuestionsTable();
createUsersTable();
rsvpTable();
deleteMeetupTable();
deleteQuestionsTable();


export default client;

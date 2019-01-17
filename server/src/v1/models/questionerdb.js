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
            location text NOT NULL,
            createdOn DATE NOT NULL default CURRENT_DATE,
            topic text NOT NULL,
            images text,
            tags text,
            happeningOn DATE NOT NULL
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
            createdOn date NOT NULL default CURRENT_date,
            createdBy int,
            meetupId int,
            title character varying(50),
            questionBody text NOT NULL,
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
            firstName character varying(50) NOT NULL,
            lastName character varying(50) NOT NULL,
            otherName character varying(50),
            email varchar(320) NOT NULL,
            phoneNumber varchar(11) NOT NULL,
            password varchar(60) NOT NULL,
            username varchar(10) NOT NULL,
            registered date NOT NULL default current_date,
            isAdmin boolean
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
            meetupId INTEGER NOT NULL REFERENCES meetups, 
            userId INTEGER NOT NULL REFERENCES users, 
            response character varying(20) NOT NULL
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
            throw err;
        }
        console.log(res, 'questions table deleted');
    });
};
const droprsvp = () => {
    const queryString = 'DROP TABLE rsvp';
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        }
        console.log(res, 'rsvp table deleted');
    });
};

const dropusers = () => {
    const queryString = 'DROP TABLE users';
    client.query(queryString, (err, res) => {
        if (err) {
            throw err;
        }
        client.end();
        console.log(res, 'users table deleted');
    });
};

createDatabaseQuestioner();
createMeetupsTable();
createQuestionsTable();
createUsersTable();
rsvpTable();



export default client;

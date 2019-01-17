import jwt from 'jsonwebtoken';
import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import config from '../configurations/config';

const privateKey = config.secret_key;

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
 * @function createUser
 *
 * Create new user
 * @param  {object} req
 * @param  {object} res
 */
const createUser = (req, res) => {
    const checkSql = 'SELECT * FROM users where email = $1';
    const reqEmail = req.body.email;
    const sqlQueryString = `INSERT INTO users( firstName, lastName, otherName, email, phoneNumber, password, username,
                                isAdmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const hashedPwd = bcrypt.hashSync(req.body.password, 10);
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.othername,
        req.body.email,
        req.body.phonenumber,
        hashedPwd,
        req.body.username,
        req.body.roles
    ];
    client.query(checkSql, [reqEmail], (err, response) => {
        if (response.rowCount > 0) {
            return res.status(400).json({
                status: 400,
                message: 'User already exists with this email, log in instead'
            });
        }
        client.query(sqlQueryString, values, (error, result) => {
            if (error) {
                return res.status(400).json({
                    status: 400,
                    message: error.message,
                });
            }
            const token = jwt.sign(
                {
                    userId: response.rows[0].id,
                    email: response.rows[0].email
                }, privateKey, { expiresIn: '1d' }
            );
            return res.status(201).json({
                status: 201,
                data: [
                    token,
                    {
                        id: result.rows[0].id,
                        firstname: result.rows[0].firstname,
                        lastname: result.rows[0].lastname,
                        othername: result.rows[0].othername,
                        email: result.rows[0].email,
                        phonenumber: result.rows[0].phonenumber,
                        username: result.rows[0].username,
                        registered: result.rows[0].registered
                    }
                ]
            });
        });
    });
};
/**
 * @function loginUser
 *
 * Login in user
 *
 * @param  {object} req
 * @param  {object} res
 */
const loginUser = (req, res) => {
    const reqEmail = [req.body.email];
    const reqPwd = req.body.password;
    const sql = 'SELECT * FROM users where email = $1';
    client.query(sql, reqEmail, (err, response) => {
        if (response.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: 'There\'s no user with this email'
            });
        }
        console.log(response.rows);
        // console.log(response.rowCount);
        const compPwd = response.rows[0].password;
        const userPwd = bcrypt.compareSync(reqPwd, compPwd);
        if (!userPwd) {
            return res.status(401).json({
                status: 401,
                message: 'Auth failure, passwords do not match'
            });
        }

        const token = jwt.sign(
            {
                username: response.rows[0].username,
                userId: response.rows[0].id,
            }, privateKey, { expiresIn: '1d' }
        );
        return res.status(201).json({
            status: 200,
            token,
        });
    });
};

/**
 * @function getUsers
 *
 * Fetches data for all users
 *
 * @param  {object} req
 * @param  {objext} res
 */
const getUsers = (req, res) => {
    const sqlQueryString = 'SELECT * FROM users';
    client.query(sqlQueryString, (err, response) => {
        if (response.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: 'You have no users'
            });
        }
        return res.status(200).json({
            status: 200,
            data: [response.rows]
        });
    });
};
/**
 * @function getUser
 *
 * Fetches data for a single user
 *
 * @param  {} req
 * @param  {} res
 */
const getUser = (req, res) => {
    const sqlQueryString = 'SELECT * FROM users where email = $1';
    const reqId = Number(req.params.id);
    client.query(sqlQueryString, [reqId], (err, response) => {
        if (response.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                message: 'This user cannot be found'
            });
        }
        return res.status(200).json({
            status: 200,
            data: [response.rows]
        });
    });
};


const Users = {
    createUser,
    loginUser,
    getUsers,
    getUser
};

export default Users;

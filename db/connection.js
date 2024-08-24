import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
});

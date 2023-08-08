require("dotenv").config();
const pg = require("pg");

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABSE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect().then(res => {
    console.log("DB is connected!");
}).catch(err => console.log(err));

module.exports = pool;

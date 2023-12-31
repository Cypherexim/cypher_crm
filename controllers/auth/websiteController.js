const db = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.website = {
    register: (req, res, next) => {
        const {name, company, email, source, phone, isAlreadyUser} = req.body;
        const sql = `insert into website_register (name, company_name, email, phone, already_user, 
            source, transaction_time) values('${name}', '${company}', '${email}', '${phone}', 
            '${isAlreadyUser}', '${source}', NOW())`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    checkoutPackage: (req, res, next) => {
        const {name, country, company, email, phone, source, planName} = req.body;
        const sql = `insert into website_checkout (name, company_name, email, phone, country, 
            source, plan_name, transaction_time) values('${name}', '${company}', '${email}', '${phone}', 
            '${country}', '${source}', '${planName}', NOW())`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    demoSchedule: (req, res, next) => {
        const {time, date, name, company, email, phone, desc} = req.body;
        const sql = `insert into "website_scheduleDemo" (schedule_date, schedule_time, user_name, company_name, email,
            phone, description, transaction_time) values('${date}', '${time}', '${name}', '${company}', '${email}', '${phone}', 
            $1, NOW())`;
 
        try {
            db.query(sql, [desc],(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    countriesData: (req, res, next) => {
        const continentName = req.query.continent;
        const sql = `select * from "website_ImpExp_Countries" where continent_name='${continentName}' and active=true;`

        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, result: result.rows });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    }
}

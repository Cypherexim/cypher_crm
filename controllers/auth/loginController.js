const db = require("../../config/db");
const {ErrorHandler} = require("../../error/ErrorHandler");

exports.login = {
    userLogin: (req, res, next) => {
        const {username, password} = req.body;
        const query = `select * from crm_users where email='${username}' and active=true`;
        const query2 = `select * from crm_users where password='${password}' and active=true`;
        const query3 = `update crm_users set last_login=now() where email='${username}' and password='${password}' and active=true`;

        try {
            db.query(query, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {
                    if(result.rows.length>0) {
                        db.query(query2, (err2, result2) => {
                            if(err2) { next(ErrorHandler.interServerError(err2.message)); }
                            else {
                                if(result2.rows.length>0) {
                                    db.query(query3, (err3, result3) => {
                                        if(err3) { next(ErrorHandler.interServerError(err3.message)); }
                                        else res.json({error: false, result: result2.rows});                                        
                                    });
                                } else next(ErrorHandler.authenticationError("Password is incorrect!"));
                            }
                        });
                    } else { next(ErrorHandler.authenticationError("Username is invalid!")); }
                }
            });           
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    }
};

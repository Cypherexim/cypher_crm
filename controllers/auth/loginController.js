const db = require("../../config/db");
const {getMinutes, setTimeInFormat} = require("../../utils/timeConvertor");
const {ErrorHandler} = require("../../error/ErrorHandler");

exports.login = {
    userLogin: (req, res, next) => {
        const {username, password} = req.body;
        const query = `select * from crm_users where email='${username}' and active=true`;
        const query2 = `select table2.id, name, email, password, role, permission_id, last_login, add_user, edit_user, delete_user, 
        add_lead, edit_lead, has_dashboard, has_admin, has_lead, has_demo, has_pricing, has_invoice, has_chat from "crm_permissions" 
        as table1 full outer join crm_users as table2 on table1.id=table2.permission_id where password='${password}' and table2.active=true;`
        const query3 = `update crm_users set last_login=now() where email='${username}' and password='${password}' and active=true`;

        try {
            db.query(query, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    if(result.rows.length>0) {
                        db.query(query2, (err2, result2) => {
                            if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                            else {
                                if(result2.rows.length>0) {
                                    db.query(query3, (err3, result3) => {
                                        if(err3) { next(ErrorHandler.internalServerError(err3.message)); }
                                        else res.json({error: false, result: result2.rows});                                        
                                    });
                                } else next(ErrorHandler.authenticationError("Password is incorrect!"));
                            }
                        });
                    } else { next(ErrorHandler.authenticationError("Username is invalid!")); }
                }
            });           
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    loginLog: (req, res, next) => {
        const {id, date} = req.body;
        const currentTime = new Date();
        const sql1 = `select id, login_time, logout_time, total_minutes, log_history from "crm_loginLog" 
        where user_id=${id} and transaction_date=${date}`;
        const sql2 = `update "crm_loginLog" set login_time=now(), log_history=$1 where user_id=${id}`;
        const sql3 = `insert into "crm_loginLog" (user_id, login_time, transaction_date, total_minutes, log_history) 
        values(${id}, now(), '${date}', 0, $1)`;

        try {
            db.query(sql1, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    if(result.rows.length>0) {
                        const logHistory = JSON.parse(result.rows[0]["log_history"]);
                        logHistory.push({
                            status: "login",
                            time: setTimeInFormat(currentTime)
                        });
                        db.query(sql2, [JSON.stringify(logHistory)], (err2, result2) => {
                            if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                            else {res.json({error: false, msg: "Updated Successfully"});}
                        });
                    } else {
                        const logHistory = [{ status: "login", time: setTimeInFormat(currentTime) }];
                        
                        db.query(sql3, [JSON.stringify(logHistory)], (err3, result3) => {
                            if(err3) { next(ErrorHandler.internalServerError(err3.message)); }
                            else {res.json({error: false, msg: "Inserted Successfully"});}
                        });
                    }
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    userlogout: (req, res, next) => {
        const {id, date} = req.body;
        const sql1 = `select login_time, total_minutes, log_history from "crm_loginLog" where user_id=${id} and transaction_date=${date}`;
        const sql2 = `update "crm_loginLog" set total_minutes=$1, log_history=$2 where user_id=${id} and transaction_date=${date}`;

        try {
            db.query(sql1, async(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    const {total_minutes, log_history, login_time} = result.rows[0];
                    const logHistory = JSON.parse(log_history);
                    logHistory.push({ status: "logout", time: setTimeInFormat(currentTime) });
                    const loginTime = new Date(login_time);
                    const totalMinutes = total_minutes + (await getMinutes(loginTime));
                    
                    db.query(sql2, [totalMinutes, JSON.stringify(logHistory)], (err2, result2) => {
                        if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                        else {res.json({error: false, msg: "Logout Successfully"});}
                    });
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
}; 
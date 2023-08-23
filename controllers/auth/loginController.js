const db = require("../../config/db");
const {ErrorHandler} = require("../../error/ErrorHandler");

exports.login = {
    userLogin: (req, res, next) => {
        const {username, password} = req.body;
        const query = `select * from crm_users where email='${username}' and active=true`;
        const query2 = `select table2.id, name, email, password, role, permission_id, add_user, edit_user, delete_user, add_lead, 
        edit_lead, has_dashboard, has_admin, has_lead, has_demo, has_pricing, has_invoice, has_chat from "crm_permissions" 
        as table1 full outer join crm_users as table2 on table1.id=table2.permission_id where password='${password}' and table2.active=true;`
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
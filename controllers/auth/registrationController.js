const db = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.registration = {
    userRegister: (req, res, next) => {
        const {} = req.body;
        const sql = `insert into crm_users(name, email, contact, password, role, permission_id, 
        created_on, active) values('', '', '', '', '', , , true)`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({error: false, msg: "Insert Successfull"}); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
};


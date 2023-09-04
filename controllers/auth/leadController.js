const db = require("../../config/db");
const converter = require("number-to-words");
const { ErrorHandler } = require("../../error/ErrorHandler");

const isNotValue = (val) => ["",null].includes(val);
const capitalizeFirstLetter = (value) => {
    const splittedVal = value.split(" ");
    return splittedVal.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ");
}

exports.lead = {
    /***************Fetching**********************/
    fetchOpenLeads: (req, res, next) => {
        console.log(capitalizeFirstLetter(converter.toWords(200000).replace(new RegExp("-", "g"), " ").replace(new RegExp(",", "g"), "") + " only"));
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, remarks, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, followup_tracker, table2.transaction_time, user_id 
        from "crm_masterLeads" as table1 full outer join crm_openleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} 
        and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.interServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    fetchFollowupLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, followup_tracker, table2.transaction_time 
        from "crm_masterLeads" as table1 full outer join crm_followupleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} 
        and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.interServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    fetchRejectLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, followup_tracker, table2.transaction_time 
        from "crm_masterLeads" as table1 full outer join crm_rejectleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} 
        and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.interServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },

    
    fetchCloseLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select * from crm_closeleads where user_id=${userId} and active=true order by transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.interServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    fetchStatusLead: (req, res, next) => {
        const {userId} = req.query;
        const sql = `select id, lead_data, assigners, status, transaction_time, active, email 
        from crm_statusleads where ${userId}=any(assigners) and active=true`;
        
        try {
            db.query(sql, (err, result) => {
                if(err)  {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    fetchDemoLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, demo_time, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, (select name from crm_users where id=assigned_from) as assigned_from, lead_tracker, 
		followup_tracker, table2.transaction_time from "crm_masterLeads" as table1 full outer join crm_demoleads as table2 on table1.id=table2.leadid 
		where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    fetchPriceLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, (select name from crm_users where id=assigned_from) as assigned_from, lead_tracker, 
        followup_tracker, table2.transaction_time from "crm_masterLeads" as table1 full outer join crm_priceleads as table2 on table1.id=table2.leadid 
        where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    fetchInvoiceLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num, performa_num, 
        pan_num, remarks, source, iec_num, last_followup, next_followup, (select name from crm_users where id=assigned_from) as assigned_from, lead_tracker, 
        followup_tracker, table2.transaction_time, plan_name from "crm_masterLeads" as table1 full outer join crm_invoiceleads as table2 
        on table1.id=table2.leadid where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;
        
        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    fetchTaxInvoiceLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, plan_name, issued_by, (select name from crm_users where id=table2.issued_by) as issued_name, 
        company_name, name, designation, department, address, contact, email, location, gst_num, pan_num, source, iec_num, plan_name, invoice_date, 
        shipping_add, billing_add, tax_num, performa_num, report_name, duration, "HSN_SAC", quantity, unit, "amountBeforeTax", "amountAfterTax", tax_amt, 
        "CGST_taxPer", "SGST_taxPer", "IGST_taxPer", bank_data, payment_status, table2.transaction_time from "crm_masterLeads" as table1 full outer join 
        crm_taxinvoiceleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    /***************Inserting**********************/
    insertOpenLead: (req, res, next) => {
        const { username, company, designation, department, remark, address, location, email, contact, gst, pan, iec, userId, leadTracker, followupTracker, lastFollow, nextFollow, assignedFrom } = req.body;

        const sql1 = `insert into "crm_masterLeads" (company_name, name, designation, department, address,
            contact, email, location, gst_num, pan_num, iec_num, source, transaction_time, active) 
            values ('${company}', '${username}', '${designation}', '${department}', '${address}', '${contact}', 
            '${email}', '${location}', '${gst}', '${pan}', '${iec}', $1, NOW(), true) returning id`;
        const sql2 = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values($1, '', '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 'open', NOW(), true)`;

        try {
            db.query(sql1, [remark], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {
                    const insertedId = result.rows[0]["id"];
                    db.query(sql2, [insertedId, leadTracker, followupTracker], (err2, result2) => {
                        if(err2) {next(ErrorHandler.interServerError(err2.message));}
                        else {res.status(200).json({ error: false, msg: "Inserted Successful" });}
                    });
                }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    insertExcelOpenLeads: async(req, res, next) => {
        const { excelJson } = req.body;
        const excelRecords = JSON.parse(excelJson);

        try {
            for(let i=0; i<excelRecords.length; i++) {
                const { username, company, designation, department, remark, address, location, email, contact, gst, pan, iec, userId } = excelRecords[i];
                const sql = `insert into "crm_masterLeads" (company_name, name, designation, department, address,
                    contact, email, location, gst_num, pan_num, iec_num, source, transaction_time, active) 
                    values ('${company}', '${username}', '${designation}', '${department}', $1, '${contact}', 
                    '${email}', '${location}', '${gst}', '${pan}', '${iec}', $2, NOW(), true) returning id`;
                const sql2 = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
                    followup_tracker, current_stage, transaction_time, active) values($1, '', NULL, NULL, NULL, ${userId}, '', '', 'open', NOW(), true)`;                 

                const result = await db.query(sql, [address, remark]); //masterLead insertion
                const insertedId = result.rows[0]["id"];
                await db.query(sql2, [insertedId]);//openlead insertion
                console.log("Inserted!");

                if(i+1 == excelRecords.length) {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });                             
                }
            }

        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },

    
    revertOpenLead:(req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, ${isNotValue(lastFollow)?'NULL':`'${lastFollow}'`}, 
            ${isNotValue(nextFollow)?'NULL':`'${nextFollow}'`}, ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 
            'open', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    insertFollowupLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_followupleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 'follow up', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    insertRejectLead: (req, res, next) => {
        const {leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_rejectleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, ${isNotValue(lastFollow)?'NULL':`'${lastFollow}'`}, 
            ${isNotValue(nextFollow)?'NULL':`'${nextFollow}'`}, ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 
            'reject', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(err.message));}
    },


    insertDemoLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom, demoTime } = req.body;
        const sql = `insert into crm_demoleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, demo_time, active) values(${leadId}, $1, ${isNotValue(lastFollow)?'NULL':`'${lastFollow}'`}, 
            ${isNotValue(nextFollow)?'NULL':`'${nextFollow}'`}, ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, $2, $3, 
            'demo', NOW(), ${isNotValue(demoTime)?'NULL':`'${demoTime}'`}, true)`;
    
        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    insertInvoiceLead: async(req, res, next) => {
        const { leadId, gst, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom, plan_name, plan_price, performa_num } = req.body;
        const sql = `insert into crm_invoiceleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, performa_num, lead_tracker,  
            followup_tracker, current_stage, transaction_time, active, plan_name, plan_price) values(${leadId}, $1, ${isNotValue(lastFollow)?'NULL':`'${lastFollow}'`}, 
            ${isNotValue(nextFollow)?'NULL':`'${nextFollow}'`}, ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, ${performa_num}, $2, $3, 
            'demo', NOW(), true, '${plan_name}', '${plan_price}')`;
        const sql2 = `update "crm_masterLeads" set gst_num='${gst}' where id=${leadId}`;
        
        try {
            await db.query(sql2);
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });            
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    insertStatusLead: (req, res, next) => {
        const {leadData, assigner, status} = req.body;
        const {email} = JSON.parse(leadData);
        const sql1 = `select * from crm_statusleads where email='${email}' and active=true`;
        const sql2 = `insert into crm_statusleads (lead_data, assigners, status, transaction_time, email, active)
            values($1, $2, '${status}', now(), $3, true)`;
        const sql3 = `update crm_statusleads set lead_data=$1, assigners=$2, status='${status}', transaction_time=NOW() 
            where email=$3 and active=true`;

        try {
            db.query(sql1, (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {
                    if(result.rows.length>0) {
                        const assignerArr = (result.rows[0]["assigners"]);

                        if(!assignerArr.includes(assigner)) assignerArr.push(assigner);

                        db.query(sql3, [leadData, assignerArr, email], (err2, result2) => {
                            if(err2) {next(ErrorHandler.interServerError(err2.message));}
                            else {res.status(200).json({error: false, msg: "Update Successful"});}
                        });
                    } else {
                        const assignerArr = [ assigner ];
                        db.query(sql2, [leadData, assignerArr, email], (err2, result2) => {
                            if(err2) {next(ErrorHandler.interServerError(err2.message));}
                            else {res.status(200).json({error: false, msg: "Insert Successful"});}
                        });
                    }
                }
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    insertPriceLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_priceleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, ${isNotValue(lastFollow)?'NULL':`'${lastFollow}'`}, 
            ${isNotValue(nextFollow)?'NULL':`'${nextFollow}'`}, ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, $2, $3, 
            'demo', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    insertTaxInvoiceLead: (req, res, next) => {
        const {leadId, userId, planName, invoiceDate, address, taxNum, performaNum, reportName, duration, hsnSac, qty, unit, amount, taxAmt, gstTax, bankData, isEmailSent, attachment, paymentStatus, issuedBy} = req.body;
        const shippingAddress = `${address[0]?.line1}~${address[0]?.line2}`;
        const billingAddress = `${address[1]?.line1}~${address[1]?.line2}`;
        const sql = `insert into crm_taxinvoiceleads (leadid, user_id, plan_name, invoice_date, issued_by, shipping_add,
            billing_add, tax_num, performa_num, report_name, duration, "HSN_SAC", quantity, unit, "amountBeforeTax", "amountAfterTax", 
            tax_amt, "CGST_taxPer", "SGST_taxPer", "IGST_taxPer", bank_data, active, transaction_time, payment_status) values(${leadId}, 
            ${userId}, '${planName}', '${invoiceDate}', '${issuedBy}', $1, $2, '${taxNum}', ${performaNum}, '${reportName}', '${duration}', 
            '${hsnSac}', ${qty}, '${unit}', $3, $4, '${taxAmt}', ${gstTax?.cgst}, ${gstTax?.sgst}, ${gstTax?.igst}, '${bankData}', true, 
            NOW(), '${paymentStatus}')`;
            
        try {
            db.query(sql, [shippingAddress, billingAddress, amount[0], amount[1]], (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    /***************Updating**********************/
    updateSingleLead: (req, res, next) => {
        const {leadId, username, company, designation, department, source, address, location, email, contact, gst, pan, iec} = req.body;
        const sql = `update "crm_masterLeads" set company_name='${company}', name='${username}', designation='${designation}', department='${department}', 
        address='${address}', contact='${contact}', email='${email}', location='${location}', gst_num='${gst}', pan_num='${pan}', iec_num='${iec}', source=$1, 
        transaction_time=NOW() where id=${leadId} and active=true`;

        try {
            db.query(sql, [source], (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else { res.status(200).json({error: false, msg: "Update Successfull"}); }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    updateStatusLead: (req, res, next) => {
        const sql = `update crm_statusleads set status='process', transaction_time=NOW() where email='${req.body.email}' and active=true`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    updateFollowUpLead: (req, res, next) => {
        const {id, remark, dateTime} = req.body;
        const sql = `update crm_followupleads set remarks=$1, next_followup='${dateTime}' where id=${id} and active=true`;

        try {
            db.query(sql, [remark], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    updateLeadRemark: (req, res, next) => {
        const { id, remark, tableType } = req.body;
        const sql = `update crm_${tableType}leads set remarks=$1 where id=${id} and active=true`;

        try {
            db.query(sql, [remark], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    updateOpenLead: (req, res, next) => {
        const {id, remark, nextFollow, lastFollow, followupTracker} = req.body;
        const sql = `update crm_openleads set remarks=$1, next_followup='${nextFollow}', last_followup='${lastFollow}',
        followup_tracker=$2 where id=${id} and active=true`;

        try {
            db.query(sql, [remark, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
       } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    /***************delete**********************/
    deleteOpenLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_openleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    deleteFollowupLead: (req, res, next) => {
        const {id, leadId, userId} = req.query;
        const sql = `delete from crm_followupleads where id=${id} and leadid=${leadId} and user_id=${userId}`;
    
        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.interServerError(err.message)); }
                else { res.status(200).json({ error: false, msg: "Delete Successful" }); }
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    deleteRejectLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_rejectleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    deleteDemoLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_demoleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    deleteStatusLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql1 = `select * from crm_statusleads where id=${leadId}`;
        const sql2 = `delete from crm_statusleads where id=${leadId}`;

        try {
            db.query(sql1, (err, result) => {
                if(err) {next(ErrorHandler.interServerError(err.message));}
                else {
                    const {assigners} = result.rows[0];
                    const assignersArr = assigners.split(",");
                    
                    if(assignersArr.length>1) {
                        assignersArr.splice(assignersArr.indexOf(`${userId}`), 1);
                        const sql3 = `update crm_statusleads set assigners='${assignersArr.toString()}' where id=${leadId}`;

                        db.query(sql3, (err2, result2) => {
                            if(err2) {next(ErrorHandler.interServerError(err2.message));}
                            else {res.status(200).json({error: false, msg: "Delete Successful!"});}
                        });
                    } else if(assignersArr.length==1) {
                        db.query(sql2, (err3, result3) => {
                            if(err3) {next(ErrorHandler.interServerError(err3.message));}
                            else {res.status(200).json({error: false, msg: "Delete Successful!"});}
                        });
                    }
                }
            });
        } catch (error) {next(ErrorHandler.interServerError(error));}
    },


    deletePriceLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_priceleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    deleteInvoiceLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_invoiceleads where leadid=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    },


    deleteTaxInvoiceLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_taxinvoiceleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.interServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.interServerError(error)); }
    }
}


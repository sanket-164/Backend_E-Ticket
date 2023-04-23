import express from "express";
const router = express.Router();
import con from "../../database.js";
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const email_pass = process.env.EMAIL_PASS;
const email_user = process.env.EMAIL_USER;

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: email_user,
        pass: email_pass
    }
});

router.patch('/', (req, res) => {
    let success = false;
    const { f_id, reply } = req.body;
    const getUser = `SELECT passenger.p_email FROM passenger, feedback WHERE feedback.f_id = '${f_id}' && passenger.p_id = feedback.p_id`;
    const setFeedback = `UPDATE feedback SET a_id='${req.user.id}', reply='${reply}', f_status='Replied', r_time=CURRENT_TIMESTAMP() WHERE f_id='${f_id}'`;

    try {

        con.query(getUser, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                const passenger_email = qres[0].p_email;
                con.query(setFeedback, (err, qres) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (qres.affectedRows > 0) {

                        const mailOptions = {
                            from: email_user,
                            to: passenger_email,
                            subject: 'You Got Reply',
                            text: reply
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                res.json({ success });
                            } else if (info) {
                                success = true;
                                res.json({ success, msg: `Reply sent successfully` });
                            }
                        });
                    } else {
                        res.json({ success });
                    }
                });
            } else {
                res.json({ success });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

export default router;
import express from "express";
const router = express.Router();
import con from "../../database.js";

router.get('/', async (req, res) => {
    let success = false;
    const getReplied = `SELECT feedback.*, passenger.p_uname, admin.a_uname FROM feedback,passenger,admin WHERE feedback.p_id = passenger.p_id && feedback.a_id = admin.a_id && f_status='Replied'`;
    const getPending = `SELECT feedback.*, passenger.p_uname FROM feedback,passenger WHERE feedback.p_id = passenger.p_id && f_status='Pending'`;

    try {
        con.query(getReplied, (err, r_res) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (r_res.length > 0) {
                r_res.map((i) => {
                    const date = new Date(i.r_time);
                    const paytime = date.toLocaleString();
                    i.r_time = paytime;
                });
                r_res.map((i) => {
                    const date = new Date(i.f_time);
                    const paytime = date.toLocaleString();
                    i.f_time = paytime;
                });
                con.query(getPending, (err, p_res) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (p_res.length > 0) {
                        p_res.map((i) => {
                            const date = new Date(i.f_time);
                            const paytime = date.toLocaleString();
                            i.f_time = paytime;
                        });
                        success = true;
                        res.json({ success, feedbacks: p_res.concat(r_res) });
                    } else {
                        res.json({ success, feedbacks: [] });
                    }
                });
            } else {
                res.json({ success, feedbacks: [] });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/pending', async (req, res) => {
    let success = false;
    const getFeedback = `SELECT feedback.*, passenger.p_uname FROM feedback,passenger WHERE feedback.p_id = passenger.p_id && f_status='Pending'`;

    try {
        con.query(getFeedback, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                qres.map((i) => {
                    const date = new Date(i.f_time);
                    const paytime = date.toLocaleString();
                    i.f_time = paytime;
                });
                success = true;
                res.json({ success, feedbacks: qres });
            } else {
                res.json({ success, feedbacks: [] });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/replied', async (req, res) => {
    let success = false;
    const getFeedback = `SELECT feedback.*, passenger.p_uname, admin.a_uname FROM feedback,passenger,admin WHERE feedback.p_id = passenger.p_id && feedback.a_id = admin.a_id && f_status='Replied'`;

    try {
        con.query(getFeedback, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                qres.map((i) => {
                    const date = new Date(i.r_time);
                    const paytime = date.toLocaleString();
                    i.r_time = paytime;
                });
                qres.map((i) => {
                    const date = new Date(i.f_time);
                    const paytime = date.toLocaleString();
                    i.f_time = paytime;
                });
                success = true;
                res.json({ success, feedbacks: qres });
            } else {
                res.json({ success, feedbacks: [] });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

export default router;
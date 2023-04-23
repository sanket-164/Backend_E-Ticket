import express from "express";
const router = express.Router();
import con from "../../database.js";

router.get('/', async (req, res) => {
    let success = false;
    const getFeedback = `SELECT * FROM feedback`;
    
    try{
        con.query(getFeedback, (err, qres) => {
            if(err){
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0){
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
                res.json({ success, feedbacks: []  });
            }
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/pending', async (req, res) => {
    let success = false;
    const getFeedback = `SELECT * FROM feedback WHERE f_status='Pending'`;
    
    try{
        con.query(getFeedback, (err, qres) => {
            if(err){
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0){
                qres.map((i) => {
                    const date = new Date(i.f_time);
                    const paytime = date.toLocaleString();
                    i.f_time = paytime;
                });
                success = true;
                res.json({ success, feedbacks: qres });
            } else {
                res.json({ success, feedbacks: []  });
            }
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

router.get('/replied', async (req, res) => {
    let success = false;
    const getFeedback = `SELECT * FROM feedback WHERE f_status='Replied'`;
    
    try{
        con.query(getFeedback, (err, qres) => {
            if(err){
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0){
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
    }catch(err){
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

export default router;
/* dailyPayment.js is used to create an end point for admin to fetch all payments as per dates*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/count", async (req, res) => {
    let success = false;
    let cnt = 1;
    let date, d, datestr;
    let countTicket;
    let dateArr = [];
    let countArr = [];
    const fetchDates = `SELECT DISTINCT DATE(t_time) as date FROM ticket LIMIT 7;`;
    
    try {

        // Fetching tickets
        con.query(fetchDates, (err, dres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (dres.length > 0) {
                
                dres.map((i) => {
                    
                    date = new Date(i.date);
                    d = date.toLocaleString();
                    i.date = d.substring(0, d.indexOf(","));
                    dateArr.push(i.date);
                    datestr = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                    
                    countTicket = `SELECT COUNT(*) as tickets FROM ticket WHERE DATE(t_time)='${datestr}';`;

                    con.query(countTicket, (err, pres) => {
                        if (err) {
                            console.log(err.message);
                            res.json({ success });
                        } else if (pres.length > 0) {
                            countArr.push(pres[0].tickets);
                            if (dres.length == cnt) {
                                success = true;
                                res.json({ success, dates: dateArr, tickets: countArr });
                            } else {
                                cnt++;
                            }
                        } else {
                            res.json({ success });
                        }
                    });
                });
            } else {
                res.json({ success });
            }
        });
    } catch (error) {
        res.json({ error: error.message });
        res.status(500).send("Some error occured");
    }
});

router.get("/fare", async (req, res) => {
    let success = false;
    let cnt = 1;
    let date, d, datestr;
    let countFare;
    let dateArr = [];
    let fareArr = [];
    const fetchDates = `SELECT DISTINCT DATE(t_time) as date FROM ticket LIMIT 7;`;
    
    try {

        // Fetching tickets
        con.query(fetchDates, (err, dres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (dres.length > 0) {
                
                dres.map((i) => {
                    
                    date = new Date(i.date);
                    d = date.toLocaleString();
                    i.date = d.substring(0, d.indexOf(","));
                    dateArr.push(i.date);
                    datestr = date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate();
                    
                    countFare = `SELECT SUM(t_fare) as tickets FROM ticket WHERE DATE(t_time)='${datestr}';`;

                    con.query(countFare, (err, pres) => {
                        if (err) {
                            console.log(err.message);
                            res.json({ success });
                        } else if (pres.length > 0) {
                            fareArr.push(pres[0].tickets);
                            if (dres.length == cnt) {
                                success = true;
                                res.json({ success, dates: dateArr, amount: fareArr });
                            } else {
                                cnt++;
                            }
                        } else {
                            res.json({ success });
                        }
                    });
                });
            } else {
                res.json({ success });
            }
        });
    } catch (error) {
        res.json({ error: error.message });
        res.status(500).send("Some error occured");
    }
});

export default router;

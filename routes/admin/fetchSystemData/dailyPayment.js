/* dailyPayment.js is used to create an end point for admin to fetch all payments as per dates*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/", async (req, res) => {
    let success = false;
    let cnt = 1;
    let date, d, datestr;
    let countPayment;
    let dateArr = [];
    let payArr = [];
    const fetchDates = `SELECT DISTINCT DATE(pay_time) as date FROM payment LIMIT 7;`;
    
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
                    
                    countPayment = `SELECT SUM(pay_amount) as payments FROM payment WHERE DATE(pay_time)='${datestr}';`;

                    con.query(countPayment, (err, pres) => {
                        if (err) {
                            console.log(err.message);
                            res.json({ success });
                        } else if (pres.length > 0) {
                            payArr.push(pres[0].payments);
                            if (dres.length == cnt) {
                                success = true;
                                res.json({ success, dates: dateArr, payments: payArr });
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

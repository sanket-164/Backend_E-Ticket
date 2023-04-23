/* fetchPayment.js is used to create an end point for passenger to fetch all payments have been done by themself*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/:c_uname", async (req, res) => {
    const { c_uname } = req.params;
    const fetchId = `SELECT c_id FROM conductor WHERE c_uname='${c_uname}'`;
    let success = false;
    
    try {
        
        con.query(fetchId, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                console.log(qres[0].c_id);
                // Fetching Payments
                const fetchPayment = `SELECT payment.pay_time, payment.pay_amount, payment.pay_id, passenger.p_uname FROM payment, passenger WHERE payment.c_id='${qres[0].c_id}' && payment.p_id = passenger.p_id ORDER BY pay_time DESC;`;

                con.query(fetchPayment, (err, qres) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (qres.length > 0) {
                        qres.map((i) => {
                            const date = new Date(i.pay_time);
                            const paytime = date.toLocaleString();
                            i.pay_time = paytime;
                        })
                        success = true;
                        res.json({ success, payments: qres });
                    } else {
                        res.json({ success, payments: qres });
                    }
                });
            } else {
                res.json({ success, msg: "Conductor does not exist" })
            }
        });

    } catch (error) {
        res.json({ error: error.message });
        res.status(500).send("Some error occured");
    }
});

export default router;

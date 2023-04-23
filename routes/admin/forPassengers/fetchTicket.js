/* fetchPayment.js is used to create an end point for passenger to fetch all payments have been done by themself*/

import { Router } from "express";
const router = Router();
import con from '../../../database.js';


router.get("/:p_uname", async (req, res) => {
    const fetchID = `SELECT p_id FROM passenger WHERE p_uname='${req.params.p_uname}'`;
    let success = false;

    try {

        con.query(fetchID, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                const fetchTickets = `SELECT * FROM ticket WHERE p_id='${qres[0].p_id}' ORDER BY t_time DESC;`;

                // Fetching tickets
                con.query(fetchTickets, (err, qres) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (qres.length > 0) {
                        qres.map((i) => {
                            let date = new Date(i.t_expires);
                            const expires = date.toLocaleString();
                            i.t_expires = expires;

                            date = new Date(i.t_time);
                            const time = date.toLocaleString();
                            i.t_time = time;
                        });
                        success = true;
                        res.json({ success, tickets: qres });
                    } else {
                        success = true;
                        res.json({ success, tickets: qres });
                    }
                });
            } else {
                res.json({ success, msg: "Passenger does not exist" });
            }
        });

    } catch (error) {
        res.json({ error: error.message });
        res.status(500).send("Some error occured");
    }
});

export default router;
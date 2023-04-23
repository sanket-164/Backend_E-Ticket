/* fetchConductor.js is used to create an end point for conductor
to send their data and show them in UI after they are logged into the system*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/:p_uname", async (req, res) => {
    const fetchID = `SELECT p_id FROM passenger WHERE p_uname='${req.params.p_uname}'`;
    let success = false;

    try {

        con.query(fetchID, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                const fetchPassenger = `SELECT * FROM passenger WHERE p_id='${qres[0].p_id}'`;

                // Get the data of passenger
                con.query(fetchPassenger, (err, qres) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (qres.length > 0) {
                        const date = new Date(qres[0].p_dob);
                        const dob = date.toLocaleString();
                        qres[0].p_dob = dob.substring(0, dob.indexOf(","));
                        success = true;
                        res.json({ success, passenger: qres[0] })
                    } else {
                        res.json({ success, passenger: qres });
                    }
                });
            } else {
                res.json({ success, msg: "Conductor does not exist" });
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

export default router;

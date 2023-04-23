/* fetchConductor.js is used to create an end point for conductor
to send their data and show them in UI after they are logged into the system*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/:c_uname", async (req, res) => {
    const fetchID = `SELECT c_id FROM conductor WHERE c_uname='${req.params.c_uname}';`;
    let success = false;

    try {

        con.query(fetchID, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                const fetchConductor = `SELECT * FROM conductor WHERE c_id='${qres[0].c_id}'`;

                // Get the data of passenger
                con.query(fetchConductor, (err, qres) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (qres.length > 0) {
                        const date = new Date(qres[0].c_dob);
                        const dob = date.toLocaleString();
                        qres[0].c_dob = dob.substring(0, dob.indexOf(","));
                        success = true;
                        res.json({ success, conductor: qres[0] })
                    } else {
                        res.json({ success, conductor: qres });
                    }
                });
            } else {
                res.json({ success, msg: "Conductor does not exist" });
            }
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

export default router;

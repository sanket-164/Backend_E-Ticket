/* fetchConductor.js is used to create an end point for conductor
to send their data and show them in UI after they are logged into the system*/

import { Router } from "express";
const router = Router();
import con from "../../database.js";

router.get("/", async (req, res) => {
  const fetchConductor = `SELECT * FROM conductor WHERE c_id='${req.user.id}';`;
  let success = false;
  
  try {

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
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

export default router;

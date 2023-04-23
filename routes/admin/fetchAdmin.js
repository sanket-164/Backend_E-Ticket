/* fetchPassenger.js is used to create an end point for passenger
to send their data and show them in UI after they are logged into the system*/

import { Router } from "express";
const router = Router();
import con from '../../database.js';

router.get("/", (req, res) => {
  let success = false;
  const fetchAdmin = `SELECT * FROM admin WHERE a_id='${req.user.id}'`;
  
  try {
    
    // Get the data of passenger
    con.query(fetchAdmin, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (qres.length > 0) {
        const date = new Date(qres[0].a_dob);
        const dob = date.toLocaleString();
        qres[0].a_dob = dob.substring(0, dob.indexOf(","));
        success = true;
        res.json({ success, admin: qres[0] });
      } else {
        res.json({ success, admin: qres  });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

export default router;
/* fetchPassenger.js is used to create an end point for passenger
to send their data and show them in UI after they are logged into the system*/

import { Router } from "express";
const router = Router();
import con from '../../database.js';

router.get("/", (req, res) => {
  let success = false;
  const fetchPassenger = `SELECT *,(SELECT COUNT(*) FROM ticket WHERE p_id='${req.user.id}') as no_ticket FROM passenger WHERE p_id='${req.user.id}';`;
  
  try {
    
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
        res.json({ success, passenger: qres[0] });
      } else {
        res.json({ success, passenger: qres  });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

export default router;
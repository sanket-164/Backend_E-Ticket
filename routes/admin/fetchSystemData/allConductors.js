/* fetchAllConductor.js is used to create an end point for admin to fetch all conductors available in the system*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/", async (req, res) => {
  let success = false;

  try {
    const fetchConductors = `SELECT conductor.* FROM conductor,login WHERE conductor.c_id=login.id`;

    // Fetching tickets
    con.query(fetchConductors, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (qres) {
        qres.map((i)=>{
            const date = new Date(i.c_dob);
            const dob = date.toLocaleString();
            i.c_dob = dob.substring(0, dob.indexOf(","));
        })
        success = true;
        res.json({ success, conductors: qres });
      } else {
        res.json({ success, conductors: qres });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;

/* fetchAllStation.js is used to create an end point for passenger to fetch all availabel stations to purchase ticket*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/", async (req, res) => {
  let success = false;

  try {
    const fetchStations = `SELECT st_id, st_name FROM station;`;

    // Fetching tickets
    con.query(fetchStations, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (qres.length > 0) {
        success = true;
        res.json({ success, stations: qres });
      } else {
        res.json({ success, stations: qres });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;

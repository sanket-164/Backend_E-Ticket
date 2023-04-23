/* fetchTicket.js is used to create an end point for passenger to fetch recent purchashed ticket, particular ticket, all tickets of a passenger*/

import { Router } from "express";
const router = Router();
import con from '../../database.js';

router.get("/", async (req, res) => {
  const fetchTicket = `SELECT * FROM ticket WHERE p_id='${req.user.id}' ORDER BY t_time DESC;`;
  let success = false;

  try {

    // Fetching tickets
    con.query(fetchTicket, (err, qres) => {
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
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

router.get("/:limit", async (req, res) => {
  const { limit } = req.params;   // Get limit to fetch tickets
  const fetchTicket = `SELECT * FROM ticket WHERE p_id='${req.user.id}' ORDER BY t_time DESC LIMIT ${limit};`;
  let success = false;
  
  try {

    // Fetching tickets
    con.query(fetchTicket, (err, qres) => {
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
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;
/* scanTicket.js is used to create an end point for conductor that
will take ticket-id as tid to check that purchashed ticket is expired or not*/

import { Router } from "express";
const router = Router();
import con from "../../database.js";

router.get("/:t_id", async (req, res) => {
  let success = true;

  try {
    const checkTicket = `SELECT passenger.p_uname as p_uname,IF((SELECT DATE((SELECT t_expires FROM ticket where t_id='${req.params.t_id}')))>=(SELECT CURRENT_DATE()),IF((SELECT TIME((SELECT t_expires FROM ticket where t_id='${req.params.t_id}')))>=(SELECT CURRENT_TIME()),'Valid','Expired'),'Expired') as ticket_is FROM ticket,passenger WHERE t_id='${req.params.t_id}' && ticket.p_id=passenger.p_id;`;

    con.query(checkTicket, (err, qres) => {
      if (err) {
        console.log(err.message);
        success = false;
        res.json({ success });
      } else if (qres.length > 0) {
        res.json({ success, p_uname: qres[0].p_uname, ticket_is: qres[0].ticket_is });
      } else {
        success = false;
        res.json({ success, msg: "Ticket does not exist" });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;

/* fetchPayment.js is used to create an end point for passenger to fetch all payments have been done by themself*/

import { Router } from "express";
const router = Router();
import con from "../../database.js";
let success = false;

router.get("/", async (req, res) => {
  const fetchPayment = `SELECT payment.pay_time, payment.pay_amount, payment.pay_id, passenger.p_uname FROM payment, passenger WHERE payment.c_id='${req.user.id}' && payment.p_id = passenger.p_id ORDER BY pay_time DESC;`;

  try {
  
    // Fetching Payments
    con.query(fetchPayment, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({ success });
      } else if (qres.length > 0) {
        qres.map((i)=>{
            const date = new Date(i.pay_time);
            const paytime = date.toLocaleString();
            i.pay_time = paytime;
        })
        success = true;
        res.json({ success, payments: qres });
      } else {
        res.json({ success, payments: qres });
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;

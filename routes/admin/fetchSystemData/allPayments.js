/* fetchAllPayment.js is used to create an end point for admin to fetch all payments have been done*/

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.get("/", async (req, res) => {
  let success = false;

  try {
    const fetchPayment = `SELECT payment.pay_time, payment.pay_amount, payment.pay_id, passenger.p_uname, conductor.c_uname FROM payment, passenger, conductor WHERE payment.p_id = passenger.p_id && payment.c_id = conductor.c_id ORDER BY pay_time DESC;`;

    // Fetching tickets
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

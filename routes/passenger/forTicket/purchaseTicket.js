/* createTicket.js is used to create an end point for passenger to purchashed ticket and store into database*/

import { Router } from "express";
const router = Router();
import con from '../../../database.js';

// Middlewares used to create ticket
import fetchloc from "../../middleware/fetchLoc.js";
import findDistance from "../../middleware/findDistance.js";

router.use(fetchloc, findDistance);

router.post("/", async (req, res) => {
  const quantity = req.body.quantity;
  const d = new Date();
  let success = false;
  let amount = 0, expires = d.getFullYear() +'-'+ (parseInt(('0' + d.getMonth()).slice(-2))+1) +'-'+ ('0' + d.getDate()).slice(-2);

  const year = ('0' + d.getFullYear()).slice(3);
  const month = ('0' + d.getMonth()).slice(-2);
  const date = ('0' + d.getDate()).slice(-2);
  const shours = ('0' + d.getHours()).slice(-2);
  const min = ('0' + d.getMinutes()).slice(-2);
  const sec = ('0' + d.getSeconds()).slice(-2);
  const hours = parseInt(('0' + d.getHours()).slice(-2));
  const milsec = parseInt(('0' + d.getMilliseconds()).slice(-2));

  if(req.dist>=0 && req.dist<= 2){
    amount = 4;
    expires += ' ' + ((hours+2)>23?'23-59-59':(hours+2)+'-'+ min +'-'+ sec);
  }else if(req.dist>=3 && req.dist<= 5){
    amount = 6;
    expires += ' ' + ((hours+3)>23?'23-59-59':(hours+3)+'-'+ min +'-'+ sec)
  }else if(req.dist>=6 && req.dist<= 8){
    amount = 8;
    expires += ' ' + ((hours+3)>23?'23-59-59':(hours+3)+'-'+ min +'-'+ sec)
  }else if(req.dist>=9 && req.dist<= 11){
    amount = 10;
    expires += ' ' + ((hours+4)>23?'23-59-59':(hours+4)+'-'+ min +'-'+ sec)
  }else if(req.dist>=12 && req.dist<= 14){
    amount = 12;
    expires += ' ' + ((hours+4)>23?'23-59-59':(hours+4)+'-'+ min +'-'+ sec)
  }else if(req.dist>=15 && req.dist<= 18){
    amount = 16;
    expires += ' ' + ((hours+5)>23?'23-59-59':(hours+5)+'-'+ min +'-'+ sec)
  }else if(req.dist>=19 && req.dist<= 24){
    amount = 20;
    expires += ' ' + ((hours+5)>23?'23-59-59':(hours+5)+'-'+ min +'-'+ sec)
  }else{
    amount = 24;
    expires += ' ' + ((hours+6)>23?'23-59-59':(hours+6)+'-'+ min +'-'+ sec)
  }

  const fetchBalance = `SELECT p_balance FROM passenger WHERE p_id='${req.user.id}'`;
  const subBal = `UPDATE passenger SET p_balance=p_balance-${amount} WHERE p_id='${req.user.id}';`;
  try {
    con.beginTransaction();

    con.query(fetchBalance,(err,qres)=>{
      if((qres[0].p_balance - amount*quantity) < 0){
        res.json({ success, msg:"Your Balance is less than fare."});
      } else {
        let i;
        let tid = 'T' + year + month + date + shours + min + sec ;
        for(i=0;i<quantity;++i){
            tid = 'T' + (parseInt(year + month + date + shours + min + sec + milsec) + i);
            const inTicket = `INSERT INTO ticket VALUES ('${tid}','${req.user.id}','${req.start.st_name}','${req.dest.st_name}','${expires}',(SELECT CURRENT_TIMESTAMP()),${amount});`;
            
            // Inserting new ticket
            con.query(inTicket,(err, qres) => {
              if (err) {
                console.log(err.message);
                f = false;
                i=0;
              } else if (qres.affectedRows > 0) {

                // Subtracting balance of passenger 
                con.query(subBal,(err, qres) => {
                  if (err) {
                    console.log(err.message);
                    con.rollback();
                    res.json({ success });
                  } else if(qres.affectedRows > 0){
                    con.commit();
                    if(i===quantity){
                      ++i;
                      success = true;
                      res.send({ success });
                    }
                  } else {
                    con.rollback();
                    res.json({ success, msg:"Passenger does not exist" });
                  }
                });
              } else {
                res.json({ success });
              }
            });
        }
      }
    });
  } catch (error) {
    res.json({ error: error.message });
    res.status(500).send("Some error occured");
  }
});

export default router;
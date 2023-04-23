import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.delete("/",async (req, res) => {
  let success = false;
  const delLogin = `DELETE FROM login WHERE uname='${req.body.p_uname}';`;

  try {
      con.query(delLogin, (err, qres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          }else if(qres.affectedRows > 0){
            success = true;
            res.json({ success });
          }else{
            res.json({ success, msg:"Passenger Does not exist" })
          }
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
}
);

export default router;

import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.post("/",async (req, res) => {
    const { st_id, st_name, st_lat, st_long } = req.body;
    let success = false;

    const findStation = `SELECT * FROM station WHERE st_id=${st_id} || st_name='${st_name}'`;
    const inStation = `INSERT INTO station VALUES (${st_id},'${st_name}',${st_lat},${st_long})`;

    try {
        con.query(findStation, (err, qres) => {
          if(err){
            console.log(err.message);
            res.json({ success });
          } else if(qres.length > 0){
            res.json({ success, msg:"Station already exist"});
          } else {
            con.query(inStation, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              }else if(qres.affectedRows > 0){
                success = true;
                res.json({ success });
              }else{
                res.json({ success })
              }
            });
          }
        });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

export default router;

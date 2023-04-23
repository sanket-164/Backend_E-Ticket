import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.patch("/",async (req, res) => {
    const { st_id, st_name, st_lat, st_long } = req.body;
    let success = false;

    const findStation = `SELECT st_id FROM station WHERE st_id=${st_id}`;
    const updateStation = `UPDATE station SET st_name='${st_name}', st_lat=${st_lat}, st_long=${st_long} WHERE st_id=${st_id}`;

    try {
        con.query(findStation, (err, qres) => {
          if(err){
            console.log(err.message);
            res.json({ success });
          } else if(qres.length > 0){
            con.query(updateStation, (err, qres) => {
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
          } else {
            res.json({ success, msg:"Station does not exist"});
          }
        });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

export default router;

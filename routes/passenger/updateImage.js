/* changeImage.js is used to create an end point for passenger
to change profile picture of themself into system*/

import { Router } from "express";
const router = Router();
import con from '../../database.js';

router.patch("/", async (req, res) => {
  let { image } = req.body;

  try {
    let success = true;
    image = `data:image/png;base64,${image}`;
    if(image){
        const setImg = `UPDATE passenger SET p_img='${image}' WHERE p_id='${req.user.id}';`;
    
        // Changing Picture of passenger
        con.query(setImg, (err, qres) => {
          if (err) {
            console.log(err.message);
            success = false;
            res.json({ success });
          } else if (qres.affectedRows > 0) {
            res.json({ success })
          } else {
            success = false;
            res.json({ success, msg:"Passenger does not exist" });
          }
        });
    } else {
        success = false;
        res.json({ success })
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

export default router;

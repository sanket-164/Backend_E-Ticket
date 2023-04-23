/* changPwd.js is used to create an end point for user to change their password by verification of pin send by an email */

import { Router } from "express";
const router = Router();
import bcryptjs from "bcryptjs";
import con from "../../database.js"; // Connection object to run query

const { genSalt, hash } = bcryptjs;

router.patch("/", async (req, res) => {
  const { uname, password } = req.body;
  let success = false;
  
  const findUser = `SELECT * FROM login WHERE uname='${uname}';`;
  
  // Creating salt to perform hash operation on password
  const salt = await genSalt(10);
  // Generating hash value according to pwd and salt
  const secPass = await hash(password, salt);
  
  try {    
        con.query(findUser,(err,qres)=>{
          if(err){
            console.log(err.message);
            res.json({ success })
          } else if(qres.length > 0){

            // Updating password
            const setPwd = `UPDATE login SET pwd='${secPass}' WHERE uname='${uname}'`;
            con.query(setPwd, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres) {
                success = true;
                res.json({ success, msg:"Password has been changed" });
              } else {
                res.json({ success });
              }
            });
          } else {
            res.json({ success, msg:'User does not exist' });
          }
        });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

export default router;

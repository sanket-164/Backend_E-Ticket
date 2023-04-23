/* changeConductor.js is used to create an end point for conductor and admin 
to change information of conductor that exist into system */

import { Router } from "express";
const router = Router();
import con from "../../database.js";

router.patch("/", async (req, res) => {
  const { c_uname, c_name, c_email, c_no } = req.body;
  let success = false;

  // Checks user with this username or email exist or not
  const findUser = `SELECT c_uname FROM conductor WHERE c_uname='${c_uname}' && c_id!='${req.user.id}';`;
  const checkEmail = `SELECT c_email FROM conductor WHERE c_email='${c_email}' && c_id!='${req.user.id}'`;
  const setLogin = `UPDATE login SET uname='${c_uname}' WHERE id='${req.user.id}'`;
  const setConductor = `UPDATE conductor SET c_uname='${c_uname}', c_name='${c_name}', c_email='${c_email}', c_no=${c_no ? c_no : null} WHERE c_id='${req.user.id}'`;

  try {

    con.query(findUser, (err, qres) => {
      if (err) {
        console.log(err.message);
      } else if (qres.length > 0) {
        res.json({ success, msg: "A User with this Usename already exist" });
      } else {

        con.query(checkEmail, (err, qres) => {
          if (err) {
            console.log(err.message);
          } else if (qres.length > 0) {
            res.json({ success, msg: "This email is already registered" });
          } else {
            con.beginTransaction();

            // Changing information into conductor table

            con.query(setConductor, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres.affectedRows > 0) {

                // Changing information into login table
                con.query(setLogin, (err, qres) => {
                  if (err) {
                    console.log(err.message);
                    con.rollback();    // Undo changes into database
                    res.json({ success });
                  } else if (qres.affectedRows > 0) {
                    success = true;
                    con.commit();    // Saving changes into database
                    res.json({ success });
                  } else {
                    con.rollback();
                    res.json({ success, msg: "Conductor does not exist" });
                  }
                });
              } else {
                console.log(qres);
                res.json({ success, msg: "Conductor does not exist" });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

export default router;

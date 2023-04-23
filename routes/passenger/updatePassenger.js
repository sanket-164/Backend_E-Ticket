/* updatePassenger.js is used to create an end point for passenger
to change information of themself into system*/

import { Router } from "express";
const router = Router();
import con from '../../database.js';

router.patch("/", async (req, res) => {
  const { p_uname, p_name, p_email, p_no } = req.body;
  let success = false;

  const findUser = `SELECT p_uname FROM passenger WHERE p_uname='${p_uname}' && p_id!='${req.user.id}'`;
  const checkEMail = `SELECT p_email FROM passenger WHERE p_email='${p_email}' && p_id!='${req.user.id}'`;
  const setLogin = `UPDATE login SET uname='${p_uname}' WHERE id='${req.user.id}'`;
  const setPassenger = `UPDATE passenger SET p_uname='${p_uname}', p_name='${p_name}', p_email='${p_email}', p_no=${p_no ? p_no : null} WHERE p_id='${req.user.id}'`;

  try {

    con.query(findUser, (err, qres) => {
      if (err) {
        console.log(err.message);
      } else if (qres.length > 0) {
        res.json({ success, msg: "A User with this Usename already exist" });
      } else {

        con.query(checkEMail, (err, qres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (qres.length > 0) {
            res.json({ success, msg: "This Email is already registered" });
          } else {
            con.beginTransaction();

            //  Changing information of passenger
            con.query(setPassenger, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres.affectedRows > 0) {

                // Changing login related information of passenger
                con.query(setLogin, (err, qres) => {
                  if (err) {
                    console.log(err.message);
                    con.rollback(); // Undo changes into database
                    res.json({ success });
                  } else if (qres.affectedRows > 0) {
                    success = true;
                    con.commit(); // Saving changes into database
                    res.json({ success });
                  } else {
                    con.rollback();
                    res.json({ success, msg: "Passenger does not exist" });
                  }
                });
              } else {
                res.json({ success, msg: "Passenger does not exist" });
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

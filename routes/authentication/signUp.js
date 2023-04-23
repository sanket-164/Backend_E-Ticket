/* signup.js is used to create an end point for user to sign up into system and 
it will send JWT in response and store information about user into database if that user does not exist */

import { Router } from "express";
const router = Router();
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import con from "../../database.js"; // Connection object to run query

const SECRET_MSG = "E-TICKET"; // Secret message to send in JWT for authentication

router.post("/", async (req, res) => {
  const { uname, pwd, name, email, no, dob } = req.body;
  let success = false;

  // Creating instance of Date to generate unique id for user
  const d = new Date();
  const id =
    "P" +
    ("0" + d.getFullYear()).slice(3) +
    ("0" + d.getMonth()).slice(-2) +
    ("0" + d.getDate()).slice(-2) +
    ("0" + d.getHours()).slice(-2) +
    ("0" + d.getMinutes()).slice(-2) +
    ("0" + d.getSeconds()).slice(-2) +
    ("0" + d.getMilliseconds()).slice(-2);


  try {

    const findUser = `SELECT uname FROM login WHERE uname='${uname}'`;
    const checkEmail = `SELECT p_email FROM passenger WHERE p_email='${email}'`;
    // Checks user with this username exist or not
    con.query(findUser, async (err, qres) => {
      if (err) {
        console.log(err.message);
      } else if (qres.length > 0) {
        res.json({
          success,
          msg: "A user with this Username already exists",
        });
      } else {

        con.query(checkEmail, async (err, qres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (qres.length > 0) {
            res.json({ success, msg: "This Email is alredy registered" });
          } else {
            // Creating salt to perform hash operation on password
            const salt = await bcryptjs.genSalt(10);
            // Generating hash value according to pwd and salt
            const secPass = await bcryptjs.hash(pwd, salt);

            con.beginTransaction();

            const inLogin = `INSERT INTO login VALUES ('${id}','${uname}','${secPass}')`;
            const inPassenger = `INSERT INTO passenger VALUES ('${id}','${uname}','${name}','${email}',${no ? no : null},'${dob}',NULL,${0.0});`;

            // Inserting login related information
            con.query(inPassenger, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres.affectedRows > 0) {

                // Inserting Data of Passanger
                con.query(inLogin, (err, qres) => {
                  if (err) {
                    console.log(err.message);
                    con.rollback(); // Undo changes into database
                    res.json({ success });
                  } else if (qres.affectedRows > 0) {
                    con.commit(); // Saving changes into database

                    success = true;

                    // Storing id of user in object to create JWT
                    const data = {
                      id: id,
                    };

                    // sending JWT to user
                    const authToken = jwt.sign(data, SECRET_MSG);
                    res.json({ success, authToken });
                  } else {
                    con.rollback(); // Undo changes into database
                    res.json({ success });
                  }
                });
              } else {
                res.json({ success });
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

import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import con from "../../../database.js";

router.post("/", async (req, res) => {
  const { c_uname, c_pwd, c_name, c_email, c_no, c_dob } = req.body;
  let success = false;

  const d = new Date();
  const c_id = 'C' + ('0' + d.getFullYear()).slice(3) + ('0' + d.getMonth()).slice(-2) + ('0' + d.getDate()).slice(-2) + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) + ('0' + d.getMilliseconds()).slice(-2);

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(c_pwd, salt);

  // Checks user with this username exist or not
  const findUser = `SELECT c_uname FROM conductor WHERE c_uname='${c_uname}'`;
  const checkEmail = `SELECT c_email FROM conductor WHERE c_email='${c_email}'`;
  const inLogin = `INSERT INTO login VALUES ('${c_id}','${c_uname}','${secPass}')`;
  const inConductor = `INSERT INTO conductor VALUES ('${c_id}','${c_uname}','${c_name}','${c_email}',${c_no ? c_no : null},'${c_dob}',NULL)`;

  try {
    con.query(findUser, (err, qres) => {
      if (err) {
        console.log(err.message);
      } else if (qres.length > 0) {
        res.json({ success, msg: "A User with this Usename already exist" });
      } else {

        con.query(checkEmail, async (err, qres) => {
          if (err) {
            console.log(err.message);
            res.json({ success });
          } else if (qres.length > 0) {
            res.json({ success, msg: "This Email is already registered" });
          } else {
            con.beginTransaction();

            con.query(inConductor, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres.affectedRows > 0) {
                con.query(inLogin, (err, qres) => {
                  if (err) {
                    console.log(err.message);
                    con.rollback();
                    res.json({ success });
                  } else if (qres.affectedRows > 0) {
                    con.commit();
                    success = true;
                    res.json({ success });
                  } else {
                    con.rollback();
                    res.json({ success });
                  }
                });
              } else {
                res.json({ success })
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
}
);

export default router;

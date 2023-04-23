import { Router } from "express";
const router = Router();
import con from "../../../database.js";

router.patch("/", async (req, res) => {
  const { c_id, c_uname, c_name, c_email, c_no } = req.body;
  let success = false;

  // Checks user with this username or email exist or not
  const findUser = `SELECT c_uname FROM conductor WHERE c_uname='${c_uname}' && c_id!='${c_id}'`;
  const checkEmail = `SELECT c_email FROM conductor WHERE c_email='${c_email}' && c_id!='${c_id}'`;
  const setLogin = `UPDATE login SET uname='${c_uname}' WHERE id='${c_id}'`;
  const setConductor = `UPDATE conductor SET c_uname='${c_uname}', c_name='${c_name}', c_email='${c_email}', c_no=${c_no ? c_no : null} WHERE c_id='${c_id}'`;

  try {
    con.query(findUser, (err, qres) => {
      if (err) {
        console.log(err.message);
        res.json({success});
      } else if (qres.length > 0) {
        console.log(qres);
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

            con.query(setConductor, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres.affectedRows > 0) {
                con.query(setLogin, (err, qres) => {
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

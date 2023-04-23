import { Router } from "express";
const router = Router();
import con from "../../database.js";

router.patch("/", async (req, res) => {
    const { a_uname, a_name, a_email, a_no } = req.body;
    const findUser = `SELECT a_uname FROM admin WHERE a_uname='${a_uname}' && a_id!='${req.user.id}';`;
    const checkEmail = `SELECT a_email FROM admin WHERE a_email='${a_email}' && a_id!='${req.user.id}'`;
    const setLogin = `UPDATE login SET uname='${a_uname}' WHERE id='${req.user.id}';`;
    const setAdmin = `UPDATE admin SET a_uname='${a_uname}', a_name='${a_name}', a_email='${a_email}', a_no=${a_no ? a_no : null} WHERE a_id='${req.user.id}'`;
    let success = false;

    try {
        con.query(findUser, (err, qres) => {
            if (err) {
                console.log(err.message);
                res.json({ success });
            } else if (qres.length > 0) {
                res.json({ success, msg: "A User with this username already exist" });
            } else {
                con.query(checkEmail, (err, qres) => {
                    if (err) {
                        console.log(err.message);
                        res.json({ success });
                    } else if (qres.length > 0) {
                        res.json({ success, msg: "This Email is already registered" });
                    } else {
                        con.beginTransaction();

                        con.query(setAdmin, (err, qres) => {
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
                                        res.json({ success })
                                    }
                                });
                            } else {
                                res.json({ success })
                            }
                        });
                    }
                });
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}
);

export default router;

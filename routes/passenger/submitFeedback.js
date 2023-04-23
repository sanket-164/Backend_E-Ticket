import express from "express";
const router = express.Router();
import con from "../../database.js";

router.post('/', async (req, res) => {
    let success = false;
    const { feedback } = req.body;
    const d = new Date();
    const f_id = 'F' + ('0' + d.getFullYear()).slice(3) + ('0' + d.getMonth()).slice(-2) + ('0' + d.getDate()).slice(-2) + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2) + ('0' + d.getMilliseconds()).slice(-2);
    const inFeedback = `INSERT INTO feedback VALUES ('${f_id}', '${req.user.id}', null, '${feedback}', CURRENT_TIMESTAMP(), null, null, 'Pending')`;
    
    try{
        con.query(inFeedback, (err, qres) => {
            if(err){
                console.log(err.message);
                res.json({ success });
            } else if (qres.affectedRows > 0){
                success = true;
                res.json({ success });
            } else {
                res.json({ success });
            }
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send("Some error occured");
    }
});

export default router;
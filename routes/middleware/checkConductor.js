import con from '../../database.js';

const checkConductor = (req,res,next) =>{
    const check = `SELECT c_uname FROM conductor, login WHERE c_id='${req.user.id}' && c_id = id`;

    try {
        con.query(check,(err,qres)=>{
            if(err){
                console.log(err.message);
            } else if(qres.length > 0){
                next();
            } else {
                res.json({ success:false, msg:"Authentication did not happen"});
            }
        })
    } catch(error) {
        res.json({ success: false, msg:"Authentication did not happen"});
    }
}

export default checkConductor;
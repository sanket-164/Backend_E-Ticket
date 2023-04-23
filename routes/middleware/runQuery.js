import con from '../database';

const runQuery = (req,res,query) =>{
    return new Promise((resolve,reject)=>{
        try {
            con.query(query, (err, qres) => {
              if (err) {
                console.log(err.message);
                res.json({ success });
              } else if (qres) {
                  resolve(qres);
              }
            });
          } catch (error) {
            res.json({ error: error.message });
            res.status(500).send("Some error occured");
          }
    });
}

export default runQuery
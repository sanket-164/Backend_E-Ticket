/* fetchLoc.js is used to create a middleware that is used to fetch latitude longitude of station 
using station's id and store into req object */

import con from '../../database.js';

const fetchloc = (req, res, next) => {
    const { start, dest } = req.body;       // Fetching station id of start and end location

    // Fetching latitude and longitude from database
    const startLoc = `SELECT * FROM station WHERE st_id = '${start}' `;
    const endLoc = `SELECT * FROM station WHERE st_id = '${dest}' `;
    
    con.query(startLoc, (err,qres)=>{
        if(err){
            console.log(err);
        }else if(qres){

            // Storing start location's information into req object
            req.start = qres[0];
            con.query(endLoc, (err,qres)=>{
                if(err){
                    console.log(err);
                    res.json({ success: false });
                }else if(qres){
                    // Storing start location's information into req object
                    req.dest = qres[0];

                    // Calling next function
                    next();
                } else {
                    res.json({ success: false });
                }
            })
        } else {
            res.json({ success: false });
        }
    })
}

export default fetchloc;
/* fetchUser.js is used to create a middleware that is used to authenticate user and store id of user into req object to perform opertaions */

import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
dotenv.config();

const SECRET_MSG = process.env.SECRET_KEY_JWT;    // Secret message that was used to create JWT

const fetchuser = (req, res, next) => {
    // Fetches JWT stored in "auth-token" header and store it into "token" variable
    const token = req.header('authToken');
    
    // console.log(token);
    
    if (!token) {
        res.status(401).send({ error: "Authentication did not happen" });
    }
    
    try {

        // Stored id from header "auth-token" into "data" variable
        const data = jwt.verify(token, SECRET_MSG);
        
        // Stores "id" and "iat" into req object
        req.user = data;
        
        // Calling next function
        next();
    } catch (error) {
        res.status(401).send({ error: "Authentication did not happen" })
    }
}

export default fetchuser;
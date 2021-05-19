const jwt = require('jsonwebtoken');
    errors = []
    /* Auth checks if a person who is trying to access a specific resource is authorized to. */
    auth = async(req, res, next) => {

    try{
        const payload = {
            iss: process.env.ZOOM_JWT_API_KEY,
            exp: ((new Date()).getTime() + 5000)
        };
        const token = jwt.sign(payload, process.env.ZOOM_JWT_API_SECRET);
        
        return token
        // next();

    }catch(err){
        errors.push('Not authorized to access this resource');

    }

}

module.exports = auth;


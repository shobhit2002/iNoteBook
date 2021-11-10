var jwt = require('jsonwebtoken')
const JWT_SECRET = 'shobhit_agarwal'

const fetchuser = (req,res,next)=> {

    const token = req.header('auth-token')
    if(!token)
    return res.status(401).json({error:"Not Valid token"})

    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({error:"Not Valid token"})
    }
}

module.exports = fetchuser
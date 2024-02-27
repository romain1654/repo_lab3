// if have token, give access, otherwise, no

const jsonwebtoken = require('jsonwebtoken')

// check if token is correct, if yes, can continue
function auth(req,res,next){
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({message:'Access denied'}) // 401 is access denied
    }
    try{
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(401).send({message:'Invalid token'})
    }
}

module.exports=auth
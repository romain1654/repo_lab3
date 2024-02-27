const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req,res)=>{

    // 1. VALIDATIONS
    // Validation to check user input 
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation to check if user exists
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }
    
    // 2. PASSWORD PROTECTION 
    // hashing, the salt adds randomness
    // await because algos that can take time
    const salt = await bcryptjs.genSalt(5) // complexity of the hash
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    // 3. INSERTION OF DATA 
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword // want to encrypt this 
    })

    try {
        const savedUser = await user.save() //save data in MongoDB
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.post('/login', async(req,res)=>{
    // Validation 1 check user input
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }  
    
    // Validation 2 check user exists
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send({message:'User does not exist'})
    }

    // Validation 3 check password 
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Password is wrong'})

    }

    // Generate a key, an auth-token
    const token = jsonwebtoken.sign({_id:user.id_}, process.env.TOKEN_SECRET)
    // create a token thanks to the user_id + a secret token
    res.header('auth-token', token).send({'auth-token':token}) 
    // send back to user token twice: 1. in response, 2. in header
})


module.exports = router 
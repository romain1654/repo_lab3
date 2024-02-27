const express = require('express')
const router = express.Router()

const Film = require('../models/Film')
const verifyToken = require('../verifyToken')

router.get('/', verifyToken, async (req, res) =>{ //must verify, will go in vtoken file

    try{
        const getFilms = await Film.find()
        res.send(getFilms)
    } catch(err){
        res.status(400).send({message:err}) // 400 means there's an error in our case
    }
})

module.exports = router 
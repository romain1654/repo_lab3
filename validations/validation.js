const joi = require('joi')

const registerValidation = (data) => { //data is the body
     // return back validation applied the requirement
    const schemaValidation = joi.object({
        username:joi.string().required().min(3).max(256),
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)
    })

    return schemaValidation.validate(data) //is the data given validated?
}


const loginValidation = (data) => { //data is the body
    // return back validation applied the requirement
   const schemaValidation = joi.object({
       email:joi.string().required().min(6).max(256).email(),
       password:joi.string().required().min(6).max(1024)
   })

   return schemaValidation.validate(data) //is the data given validated?
}

// can export specific functions, because here there are many validations in this file
// can export each function separately
module.exports.registerValidation = registerValidation 
module.exports.loginValidation = loginValidation 
const Joi = require('joi');

let userloginvalidation=Joi.object({
    Email:Joi.string().required(),
    password:Joi.string().required()
})

module.exports=userloginvalidation
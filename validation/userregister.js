const Joi = require('joi');

let registeruservaliadtion=Joi.object({
    Username:Joi.string().required(),
    password:Joi.string().required(),
    Email:Joi.string().required(),
    Phone_number:Joi.number().required(),
    Address: Joi.string().required(),

})


module.exports=registeruservaliadtion
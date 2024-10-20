const Joi = require('joi');

let saveinformationValidation=Joi.object({
    Name:Joi.string().required(),
    phone_number:Joi.number().required(),
    email_address:Joi.string().required()

})

let retriveValidation=Joi.object({
    Name:Joi.string().required(),
    phone_number:Joi.number().required(),

})
let updateValidation=Joi.object({
    user_id: Joi.string().length(24).hex().required() // MongoDB ObjectId is a 24-character hex string


})

module.exports={
saveinformationValidation,
retriveValidation,
updateValidation

}
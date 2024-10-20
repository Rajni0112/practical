const Joi = require('joi');

let blogsValidation=Joi.object({
    user_id: Joi.string().length(24).hex().required(),
    post_image:Joi.string().required(),
    title:Joi.string().required(),
    tag:Joi.string().required(),
    category_id:Joi.string().length(24).hex().required(),
})


let likeValidation=Joi.object({
    user_id: Joi.string().length(24).hex().required(),
    post_id:Joi.string().length(24).hex().required(),
    is_like:Joi.boolean().required() ,
})

let commentValidation=Joi.object({
    user_id:Joi.string().length(24).hex().required(),
    post_id:Joi.string().length(24).hex().required(),
    comment:Joi.string().required(),
})

let postlistValidation=Joi.object({
    post_id:Joi.string().length(24).hex().required(),
    
})


module.exports={
    blogsValidation,
    likeValidation,
    commentValidation,
    postlistValidation
  
}
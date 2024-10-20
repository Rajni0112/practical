const mongoose=require('mongoose')

let blogschema=new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    post_image:{type:'String',require:true},
    title:{type:'String',require:true},
    tag:{type:'String',require:true},
    category_id:{ type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true })

let blogmodel=mongoose.model('blogdetails',blogschema)


let likeschema=new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    post_id:{ type: mongoose.Schema.Types.ObjectId, required: true },
    is_like: { type: Boolean, required: true } 
}, { timestamps: true })

let likemodel=mongoose.model('likedetails',likeschema)


let commentschema=new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    post_id:{ type: mongoose.Schema.Types.ObjectId, required: true },
    comment:{type:'String',require:true},
}, { timestamps: true })

let commentmodel=mongoose.model('commentdetails',commentschema)

module.exports={
     blogmodel,
     likemodel,
     commentmodel

}
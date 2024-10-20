const mongoose=require('mongoose')

let userschema=new mongoose.Schema({
    Username:{type:'String',require:true},
    password: { type: 'String', required: true },
    Email:{ type: 'String', required: true },
    Phone_number:{ type: 'Number', required: true },
    Address: { type: 'String', required: true },
    profile_pic:{type:'String'}
})

let userschemamodel=mongoose.model('user',userschema)

module.exports=userschemamodel
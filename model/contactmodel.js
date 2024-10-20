const mongoose=require('mongoose')

let contactschema=new mongoose.Schema({
    Name:{type:'String',require:true},
    phone_number:{type:'Number',require:true},
    email_address:{type:'String',require:true}
})

let contctmodel=mongoose.model('contctdetails',contactschema)

module.exports=contctmodel
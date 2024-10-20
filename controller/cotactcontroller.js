const contactschema=require('../model/contactmodel.js')
const {saveinformationValidation,retriveValidation,updateValidation}=require('../validation/saveInformation.js')
exports.saveInformation=async(req,res)=>{
 try{
const Name=req.body.Name
const phone_number=req.body.phone_number
const email_address=req.body.email_address
  
let {error}=saveinformationValidation.validate({Name,phone_number,email_address})  
if(error){
    res.status(400).json({message:error.message})
    return
   }
  let contactdata=new contactschema({
    Name:Name,
    phone_number:phone_number,
    email_address:email_address
  }) 
 let contactsave=await contactdata.save()   
   res.json({errorcode:0,message:"contcat information succsfully save",contactsave:contactsave})
 }catch(error){
  console.log(error)
  res.json({message :"internal server error"})

 }



}



exports.contctdetailRetrive=async(req,res)=>{
  try{
   let phone_number=req.body.phone_number
   const Name=req.body.Name
   let {error}=retriveValidation.validate({Name,phone_number})  
   if(error){
       res.status(400).json({message:error.message})
       return
      }

  let contactdata= await contactschema.findOne({Name:Name,phone_number:phone_number})
  if(contactdata){
    res.json({errorcode:0,message:"data find succfully",contactdata:contactdata})
  }else{
    res.json({errorcode:0,message:"data no found"})

  }

  }catch(error){
 
    res.json({message :"internal server error"})



  }



}


exports.contctdetailupdate=async(req,res)=>{
    try{
        let phone_number=req.body.phone_number
        let user_id=req.body.user_id
        let {error}=updateValidation.validate({user_id})  
        if(error){
            res.status(400).json({message:error.message})
            return
           }
     
       let contactdata= await contactschema.findOneAndUpdate({_id:user_id},{phone_number:phone_number},{new:true})
       if(contactdata){
         res.json({errorcode:0,message:"data update vsuccfully",contactdata:contactdata})
       }else{
         res.json({errorcode:0,message:"data no found"})
     
       }
     
       }catch(error){
        console.log(error)
         res.json({message :"internal server error"})
     }
     


}


exports.contctdetaildelete=async(req,res)=>{
    try{
        let phone_number=req.body.phone_number
        let user_id=req.body.user_id
        let {error}=updateValidation.validate({user_id})  
        if(error){
            res.status(400).json({message:error.message})
            return
           }
     
       let contactdata= await contactschema.findOneAndDelete({_id:user_id})
       if(contactdata){
         res.json({errorcode:0,message:"data delete vsuccfully",contactdata:contactdata})
       }else{
         res.json({errorcode:0,message:"data no found"})
     
       }
     
       }catch(error){
        console.log(error)
         res.json({message :"internal server error"})
     }
     


}

const userschema=require("../model/usermodel.js")
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcrypt');
const registeruservaliadtion=require('../validation/userregister.js')
const userloginvalidation=require('../validation/userloginvalidation.js')

exports.userRegister=async(req,res)=>{
    try{
   const Username=req.body.Username
    let password=req.body.password
    const Email=req.body.Email
    const Phone_number=req.body.Phone_number
    const Address=req.body.Address
    
    let profile_pic = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`: null; // Get file path if uploaded
    
       let {error}=registeruservaliadtion.validate({
        Username,
        password,
        Email,
        Phone_number,
        Address

       })    
   
       if(error){
        res.status(400).send(error.message)
        return
       }
       let saltround=10
       password=await bcrypt.hash(password,saltround)
       let userdata=new userschema({
        Username,
        password,
        Email,
        Phone_number,
        Address,
        profile_pic
       })
       let registeduser=await userschema.findOne({Email:Email})
          if(registeduser){
                res.status(200).json({message:"you are already registed"})
          }else{
       let user=await userdata.save()
       const token = jwt.sign({ Email: user.Email,Username:user.Username },process.env.SECRET_KEY);
        
       const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking this link: http://localhost:3000/verify/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Email sending failed: ' + error.message });
        }
        res.status(201).json({ message: 'User registered successfully, please check your email to verify your account.' });
    });

       res.status(200).json({message:"user register succsfully",token:token,user:user})
          }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
       
}


exports.userlogin=async(req,res)=>{
    try{
 const Email =req.body.Email
 let password=req.body.password
   
  const {error}=userloginvalidation.validate({Email,password})
  if(error){
    res.status(400).json({error:error.message})
  }
  
  let user=await userschema.findOne({Email:Email})
  let token=jwt.sign({Email:user.Email,Username:user.Username},process.env.SECRET_KEY)
  if(user){
    password=await bcrypt.compare(password,user.password)
    if(!password){
       res.status(404).json({message:"invalid password"})
    }else{
        res.status(200).json({message:"login succsfully",token:token,user:user})
    }
  }else{
    res.status(404).json({message:"user not found"})
  }
}catch(error){
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });

}
}
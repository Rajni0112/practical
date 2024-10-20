const express=require('express')
const router=express.Router()
const usercontroller=require('../controller/usercontroller.js')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, '../uploads');

// Check if the directory exists
if (!fs.existsSync(uploadsDir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(uploadsDir, { recursive: true });
}
       cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });
router.post('/userRegister',upload.single('profile_pic'),usercontroller.userRegister)
router.post('/userlogin',usercontroller.userlogin)

module.exports=router   
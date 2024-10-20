const express=require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
 
const blogcontroller=require('../controller/blogcontroller.js')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, '../blogpost');

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
const uploads = multer({ storage: storage });
router.post('/createpost',uploads.single('post_image'),blogcontroller.createpost)
router.post('/likepost',blogcontroller.likepost)
router.post('/commentpost',blogcontroller.commentpost)
router.post('/postlist',blogcontroller.postlist)


module.exports=router
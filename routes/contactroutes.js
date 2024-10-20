const express=require('express')
const router=express.Router()

const contectcontroller=require('../controller/cotactcontroller.js')

router.post('/saveInformation',contectcontroller.saveInformation)
router.post('/contctdetailRetrive',contectcontroller.contctdetailRetrive)
router.post('/contctdetailupdate',contectcontroller.contctdetailupdate)
router.post('/contctdetaildelete',contectcontroller.contctdetaildelete)


module.exports=router
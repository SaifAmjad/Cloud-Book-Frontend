const express=require('express');
const {createUser,loginUser, getUser}=require('../controllers/auth');
const authentication=require('../middleware/authenticate')
const router=express.Router();

router.post('/createuser',createUser)

router.post('/loginuser',loginUser);

router.get('/getuser',authentication,getUser);

module.exports=router
const User=require('../models/userSchema');
const asyncHandler=require('../middleware/asyncHandler');
const {BadRequest,UnAuth}=require('../errors/Custom-Error')
const {StatusCodes}=require('http-status-codes');
const jwt=require('jsonwebtoken')


const register=asyncHandler(async(req,res)=>{
    
    const user=await User.create(req.body);

    res.status(StatusCodes.CREATED).json({user:{name:user.name},token:user.getToken()}); 
})

const login=asyncHandler(async(req,res)=>{

    const{email,password}=req.body
    if(!email || !password){
        throw new BadRequest('Please provide credendtials');
    }

    const user=await User.findOne({email});
    if(!user){
        throw new UnAuth('User does not exist with this email');
    }

    const checkPass=await user.checkPass(password);
    if(!checkPass){
        throw new UnAuth('Password does not match')
    }

    const token=user.getToken();
    res.status(StatusCodes.OK).json({user:{name:user.name},token})

})
   
module.exports={register,login}
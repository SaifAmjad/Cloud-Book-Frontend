const User=require('../model/user');
const jwt=require('jsonwebtoken')
const asyncHandler=require('../middleware/asyncHandler')

const createUser=asyncHandler(async(req,res)=>{
    const{email}=req.body;
    const findEmail=await User.findOne({email:email});

    if(findEmail){
        throw 'Email already exist'
    }
    const user=await User.create({...req.body})
    
    if(!user){
        throw 'Error:User not created';
    }
    const token=await user.token();

    res.json({token,success:true});
})


const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

    if(!email || !password){
        throw 'Enter email and password';
    }

    const user=await User.findOne({email:email})

    if(!user){
        throw 'User does not exist';
    }

    const compare=await user.compare(password)
    
    if(!compare){
        throw 'Enter correct password'
    }

    const token=await user.token();

    res.json({user,token})
    
})

const getUser=asyncHandler(async(req,res)=>{
  const userId=req.user.id;

  const user=await User.findOne({_id:userId});
  
  res.json({user});
});


module.exports={createUser,loginUser,getUser}
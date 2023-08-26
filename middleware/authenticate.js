const jwt=require('jsonwebtoken');
const asyncHandler=require('./asyncHandler');
const {UnAuth}=require('../errors/Custom-Error')

const authenticate=asyncHandler(async(req,res,next)=>{
    authHandler=req.headers.authorization;
   
    if(!authHandler || !authHandler.startsWith('Bearer ')){
        throw new UnAuth('Not Authenticated');
    }

    const token=authHandler.split(' ')[1];
    const decode=await jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        throw new UnAuth('Not Authorized')
    }
    req.user={id:decode.id,name:decode.name}
    next();
})

module.exports=authenticate;
 

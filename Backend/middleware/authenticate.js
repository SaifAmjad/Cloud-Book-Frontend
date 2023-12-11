const jwt=require('jsonwebtoken');

const seceret="nneriiu039i0923dinnkjdqn2o930900920dind"
const authentication=async(req,res,next)=>{
    const token= req.header('auth-token');

    try { 
        const jwtVerify=await jwt.verify(token,seceret);
        req.user={id:jwtVerify.id,name:jwtVerify.name};
        next();
    } catch (error) {
        next(error);
    }
}

module.exports=authentication; 
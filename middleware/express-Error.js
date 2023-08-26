const {StatusCodes}=require('http-status-codes');

const expressErrorHandler=(err,req,res,next)=>{
let customError={ 
   statusCode:err.status  || StatusCodes.INTERNAL_SERVER_ERROR,
   message: err.msg ||'Something went wrong'
}

if(err.name==='ValidationError'){
   customError.message=Object.values(err.errors).map((item)=>item.message).join(',');
   customError.statusCode=400
}

if(err.code && err.code===11000){
   customError.message=`Duplicate value entered for ${Object.keys(err.keyValue)} field`;
   customError.statusCode=400;
}
if(err.name==='CastError'){
   customError.message='No item found'
   customError.statusCode=404;
}


   return res.status(customError.statusCode).json({err:customError.message}) 
} 


module.exports=expressErrorHandler
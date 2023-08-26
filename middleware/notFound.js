const {NotFound}=require('../errors/Custom-Error')

const notFound=(req,res,next)=>{
    next(new NotFound('This Route does not exist'));
}

module.exports=notFound
const expressError=(err,req,res,next)=>{
    res.json(err);
}

module.exports=expressError
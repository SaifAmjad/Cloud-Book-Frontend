const Jobs=require('../models/jobsSchema');
const {StatusCodes}=require('http-status-codes')
const {BadRequest,UnAuth,NotFound}=require('../errors/Custom-Error')
const asyncHandler=require('../middleware/asyncHandler')

const getAllJobs=asyncHandler(async(req,res)=>{
    const{id}=req.user;
    const getAll=await Jobs.find({createdBy:id}).sort('createdAt');
    res.status(StatusCodes.CREATED).json({jobs:getAll,count:getAll.length});
})

const getJob=asyncHandler(async(req,res)=>{
      const{id}=req.user;
      const objId=req.params.id;
      const getJob=await Jobs.findOne({_id:objId,createdBy:id});
      if(!getJob){
        throw new NotFound(`No job with this id: ${id}`);
      }
      res.status(StatusCodes.CREATED).json({job:getJob});
})

const createJob=asyncHandler(async(req,res)=>{
    const{company,title}=req.body;
    const{id}=req.user
    
    const existProp=await Jobs.find({company,title,createdBy:id});

    if(existProp.length!==0){
        throw new BadRequest('Same company and title already exist');
    }

    const tempJob={company,title,createdBy:id} 
    const createJob=await Jobs.create(tempJob);
    if(!createJob){
        throw new UnAuth("Document not created")
    }

    res.status(StatusCodes.CREATED).json({job:createJob});
})

const updateJob=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    const objid=req.params.id;

    const job=await Jobs.findOneAndUpdate({_id:objid,createdBy:userId},req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFound(`No job with id:${id}`);
    }
    res.status(StatusCodes.CREATED).json({job});

})

const deleteJob=asyncHandler(async(req,res)=>{
    const objId=req.params.id;
    const userId=req.user.id;
    
    const job=await Jobs.findByIdAndRemove({_id:objId,createdBy:userId});
    if(!job){
        throw new NotFound(`No job exist with this id: ${objId}`);
    }

    res.status(StatusCodes.CREATED).json({msg:'Deleted',job})
    
})

module.exports={getAllJobs,getJob,createJob,updateJob,deleteJob}
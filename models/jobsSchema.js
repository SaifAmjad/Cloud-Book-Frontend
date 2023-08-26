const Mongoose=require('mongoose');

const jobsSchema=new Mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please provide company name'],
        maxLength:50
    },
    title:{
        type:String,
        required:[true,'Please Provide title name'],
        maxLength:120
    },
    status:{
        type:String,
        enum:['interview','rejected','pending'],
        default:'pending'
    },
    createdBy:{
        type:Mongoose.Types.ObjectId,
        ref:'users',
        required:[true,'Please provide user Id'] 
    } 

},{timestamps:true})

module.exports=Mongoose.model('jobs',jobsSchema);
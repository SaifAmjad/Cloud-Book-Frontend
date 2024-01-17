const Mongoose=require('mongoose');

const noteSchema=new Mongoose.Schema({
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:[true,'Please enter title']
    },
    description:{
        type:String,
        required:[true,'Please enter description']
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports=Mongoose.model('notes',noteSchema);
const Mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const userSchema=new Mongoose.Schema({
    name:{
        type:String, 
        required:[true,'Please provide your name'],
        minlength:3,
        maxlength:15,
    }, 
    email:{
        type:String,
        required:[true,'Please provide your email'],
        match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,'Please provide correct email'],
        unique:true
    }, 
    password:{
        type:String,
        required:[true,'Please Provide correct password'],
        minlength:5
    }

})

userSchema.pre('save',async function(){
   
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);

})

userSchema.methods.getToken=function(){
    const id=this._id;
    const name=this.name;
    const token=jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn:'2d'});
    return token;
}

userSchema.methods.checkPass=async function(pass){
    const match=await bcrypt.compare(pass,this.password);
    return match;
}

module.exports=Mongoose.model('users',userSchema);
const Mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const key="nneriiu039i0923dinnkjdqn2o930900920dind"

const userSchema=new Mongoose.Schema({
    name:{
      type:String,
      required:[true,'Please enter name']
    },
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:true
    },
    password:{
      type:String,
      required:[true,'Please provide password']
    }
 
},{timestamps:true})

userSchema.pre('save',async function(){
  const salt=await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.token=async function() {

    const id=this._id;
    const name=this.name;
 
    const token= await jwt.sign({id,name},key,{expiresIn:'18d'});
    return token;
    
   
}

userSchema.methods.compare=async function(pass){
  try {
    const comparePass=await bcrypt.compare(pass,this.password);
    return comparePass;
  } catch (error) {
    next(error)
  }
}

module.exports=Mongoose.model('users',userSchema);
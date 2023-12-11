const asyncHandler=require('../middleware/asyncHandler');
const Notes=require('../model/notes');
const User=require('../model/user')


const allNotes=asyncHandler(async(req,res)=>{
    

    const notes=await Notes.find({});
    
    res.json({notes,hbnotes:notes.length}); 
})

const addNote=asyncHandler(async(req,res)=>{
    const {title,description,tag}=req.body;

    if(!title || !description){
        throw 'Fill empty fields';  
    }
    const obj={
        title,
        description,
        tag,
    }

    const notes=await Notes.create(obj);
    
    res.json(notes);

})

const updatenote=asyncHandler(async(req,res)=>{
    const{title,description,tag}=req.body;
    const id=req.params.id; 
    const userId=req.user.id;

    const user= await User.findById({_id:userId});
    if(!user){
        throw 'User does not exist'
    }

    const note=await Notes.findById({_id:id});
    if(!note){
        throw 'Note does not exist'
    }

    

    const newObj={}
    if(title) {
      newObj.title=title;
    }
    if(description){
        newObj.description=description;
    }
    if(tag){
        newObj.tag=tag;
    }
   

    const update=await Notes.findByIdAndUpdate({_id:id,user:userId},newObj,{new:true});
    if(!update){
        throw 'No notes found';
    }

    res.json({update})
})

const deletenote=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const userId=req.user.id;

    const user=await User.findById({_id:userId});
    if(!user){
        throw 'User does not found'
    }

    const note=await Notes.findById({_id:id});
    if(!note){
        throw 'Note not found'
    }
 
    const delNote=await Notes.findByIdAndRemove({_id:id,user:userId})
    if(!delNote){
        throw 'No note found to delete';
    }
    res.status(200).json(delNote);
})

module.exports={allNotes,addNote,updatenote,deletenote}
const express=require('express');
const router=express.Router();
const {allNotes,addNote,updatenote,deletenote}=require('../controllers/notes')
const authenticate=require('../middleware/authenticate');


router.get('/allnotes',authenticate,allNotes)
router.post('/addnote',authenticate,addNote);

router.put('/updatenote/:id',authenticate,updatenote);

router.delete('/deletenote/:id',authenticate,deletenote);



module.exports=router;





const express=require('express');
const router=express.Router();
const {allNotes,addNote,updatenote,deletenote}=require('../controllers/notes')
const authenticate=require('../middleware/authenticate');


router.get('/allnotes',allNotes)
router.post('/addnote',addNote);

router.put('/updatenote/:id',updatenote);

router.delete('/deletenote/:id',deletenote);



module.exports=router;





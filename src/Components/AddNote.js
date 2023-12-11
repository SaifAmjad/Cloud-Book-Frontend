import React,{useContext, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Notes from './Notes';
import NoteContext from '../Context/notes/NoteContext';

function AddNote() {
    const context=useContext(NoteContext);
    const{addNote}=context;

    const[note,setNotes]=useState({title:"",description:"",tag:"default"})
    
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNotes({title:"",description:"",tag:""});
    } 

    const onChange=(e)=>{
      setNotes({...note,[e.target.name] : e.target.value});

    }

  return (
    <>
    <div className='container my-3'>
      <h1>Add Your Notes</h1> 
      <Form>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor='title'>Title</Form.Label>
        <Form.Control minLength={2} required type="text" id='title' name='title' placeholder="Enter your Title" onChange={onChange} value={note.title}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor='description'>Description</Form.Label>
        <Form.Control minLength={5} required type="text" id='description' name='description' placeholder="Enter your Description" onChange={onChange} value={note.description}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor='tag'>Tag</Form.Label>
        <Form.Control type="text" id='tag' name='tag' placeholder="Enter your Description" onChange={onChange} value={note.tag} />
      </Form.Group>
      <Button disabled={note.title.length<3 || note.description.length<5} variant="primary" type="submit" onClick={handleClick}>
        Add Note
      </Button>
    </Form>
    </div>
   </>
  )
}

export default AddNote

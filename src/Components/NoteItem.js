import React,{useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext';

function NoteItem(props) {
  const context=useContext(NoteContext);
    const{deleteNote}=context;

    const {note,updatenote}=props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
          <i className="fa-solid fa-eraser mx-2"onClick={()=>{deleteNote(note._id)}}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem

import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host='https://cloud-book-omega.vercel.app';
  const noteData = [];
  const [notes, setNote] = useState(noteData);
  const localToken=localStorage.getItem('token')

  const getNote =async () => {
    const response = await fetch(`${host}/api/v1/notes/allnotes`, {
      method: "GET", 
      headers: {
        mode: 'no-cors',
        "Content-Type": "application/json",
        "auth-token" :localToken
      },
      
    });
    const jsondata=await response.json();
    console.log(jsondata);
    setNote(jsondata.notes);
  };

  const addNote =async (title, description, tag) => {
    const response = await fetch(`${host}/api/v1/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token" :localToken
      },
      
      body: JSON.stringify({title,description,tag}), 
    });

    let note = await response.json();   
    setNote(notes.concat(note));
   
  };


  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token" :localToken
      },
      
    });
     const jsondata=response.json();

    console.log("deleted id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNote);
  };


  const editNote =async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token" :localToken
      },
      
      body: JSON.stringify({title,description,tag}), 
    });
     const jsondata=response.json();

    let newNote=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNote(newNote);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

import React, { useContext, useRef, useState, useEffect } from "react";
import NoteContext from "../Context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNote,editNote } = context;

  const [note, setNotes] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose=useRef(null);
  const updatenote = (currentnote) => {
    ref.current.click();
    setNotes({id:currentnote._id ,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };

  const handleClick = (e) => {
    
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();

  };

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter your Title"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={2} required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter your Description"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5} required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="tag">Tag</Form.Label>
                  <Form.Control
                    type="text"
                    id="etag"
                    name="etag"
                    placeholder="Enter your Description"
                    value={note.etag}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem note={note} updatenote={updatenote} key={note._id} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;

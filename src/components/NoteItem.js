import React from "react";
import { useContext } from "react/cjs/react.development";
import NoteContext from '../context/notes/NoteContext'


export const NoteItem = (props) => {

  const { note } = props;
  let context = useContext(NoteContext);
  const {deleteNote} = context;

  return (
		<div className="col-md-3">
			<div className="card my-3">
				<div className="card-body">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text"> {note.description}</p>  
					<div className="d-flex justify-content-between">
						<i className="fas fa-trash-alt" onClick={ ()=>{ deleteNote(note._id) }}></i>       
						<i className="fas fa-edit"></i>
					</div>   
				</div>  
			</div>
		</div>
  );
};

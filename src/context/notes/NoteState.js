import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props)=>{

	const host = 'http://localhost:5000';

	const [notes, setNotes] = useState([]);


	const fetchNotes = async () => {
		const url = `${host}/api/notes/fetchallnotes`;
		let response = await fetch(url, {
			method: 'GET', 
			headers: {
			  'Content-Type': 'application/json',
			  'auth-token':localStorage.getItem('auth-token')
			},
			body: JSON.stringify()
		  });
		  response = await response.json();
		  setNotes(response);
	}


	const addNote = async (title,description,tag) => {
		const url = `${host}/api/notes/addnote`;
		const note = {
			title:title,
			description:description,
			tag:tag
		}
		let response = await fetch(url, {
			method: 'POST', 
			headers: {
			  'Content-Type': 'application/json',
			  'auth-token':localStorage.getItem('auth-token')},
			body: JSON.stringify(note)
		});

		response=await response.json();
		note._id = response._id;
		setNotes(notes.concat(note));
	} 

	const deleteNote = async (noteid)=>{

		const url = `${host}/api/notes/deletenote/${noteid}`;
		let response = await fetch(url, {
			method: 'DELETE', 
			headers: {
			  'Content-Type': 'application/json',
			  'auth-token':localStorage.getItem('auth-token')},
			body: JSON.stringify()
		});

		response=await response.json();

		let newNotes = notes.filter((note)=>{
			return note._id!==noteid;
		})
		setNotes(newNotes);
	}


	const editNote = async (noteid,title,description,tag) => {
		const url = `${host}/api/notes/updatenote/${noteid}`;
		let response = await fetch(url, {
			method: 'PUT', 
			headers: {
			  'Content-Type': 'application/json',
			  'auth-token':localStorage.getItem('auth-token')},
			body: JSON.stringify()
		});

		response=await response.json();

	
		// setNotes(newNotes);
	}
    
    return (
        <NoteContext.Provider value = {{notes,addNote ,deleteNote,fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
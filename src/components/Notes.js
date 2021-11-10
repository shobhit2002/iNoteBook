import React, { useContext,useEffect,useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { NoteItem } from './NoteItem'
import { useHistory } from 'react-router-dom'


export const Notes = () => {

    let context = useContext(NoteContext);
    const {notes,fetchNotes} = context;
    let history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem('auth-token'))
        {
            history.push('/login');
        }
        else
        fetchNotes();
    }, [])

    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note)=>{
                return <NoteItem note={note} key={note._id} />
            })}
        </div>
    )
}

import React, { useContext,useEffect,useState } from 'react'
import { AddNoteForm } from './AddNoteForm'
import { Notes } from './Notes'


export const Home = () => {

    return (
        <div className="container my-3">
            <AddNoteForm/>
            <Notes/>
        </div>
    )
}

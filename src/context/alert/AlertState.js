import AlertContext from "../alert/AlertContext";
import { useState } from "react";


const NoteState = (props)=>{

    const [alert, setAlert] = useState(null);

    const showAlert = (type,msg)=>{
        console.log("called alert "+type+" "+msg);
        setAlert({
            type:type,
            msg:msg
        })
        setTimeout(()=>{
            setAlert(null);
        },2000);
    }
	
    return (
        <AlertContext.Provider value = {{alert,showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default NoteState;
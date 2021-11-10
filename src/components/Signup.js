import {React,useContext,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import AlertContext from "../context/alert/AlertContext";

export const Signup = () => {

    const host = 'http://localhost:5000';

    let history = useHistory();

    let context = useContext(AlertContext);
    const {showAlert} = context;
    const alertState = context.alert;

    useEffect(() => {
        if(localStorage.getItem('auth-token'))
        history.push('/')
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();
        const url = `${host}/api/auth/createuser`;

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let cpassword = document.getElementById("cpassword").value;

        if(password!==cpassword)
        {
            alert("Password and confirm password didn't match");
            return false;
        }

        const data = {name,email,password};

		let response = await fetch(url, {
			method: 'POST', 
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});

		response=await response.json();
        
        if(response.success==true)
        {
            localStorage.setItem('auth-token',response.authToken);
            history.push('/')
            showAlert("success","Account Created Successfully")
        }
        else
        {
            showAlert("danger",response.error);
        }
    }

    return (
        <div className="container my-2">
            <h2>Create an Account on iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

import {React,useContext,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import AlertContext from "../context/alert/AlertContext";

export const Login = () => {

    const host = 'http://localhost:5000';

    let context = useContext(AlertContext);
    const {showAlert} = context;
    const alertState = context.alert;

    let history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('auth-token'))
        history.push('/')
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();
        const url = `${host}/api/auth/login`;

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        const data = {email,password};

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
            showAlert("success","Logged In Successfully");
        }
        else
        {
            showAlert("danger","Invalid Credentials");
        }
    }

    return (
        <div className="container my-2">
            <h2>Login to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

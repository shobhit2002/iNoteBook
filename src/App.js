import "./App.css";
import {React,useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import AlertState from "./context/alert/AlertState";

function App() {

  return (
    <>
	<AlertState>
      <NoteState>
			<Router>
				<Navbar />
				<Alert />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/about">
						<About />
					</Route>
					<Route exact path="/login">
						<Login/>
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
				</Switch>
			</Router>
      </NoteState>
	  </AlertState>
    </>
  );
}

export default App;

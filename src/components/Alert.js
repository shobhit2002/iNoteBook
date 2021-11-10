import {React,useContext} from 'react'
import { useState } from "react";
import AlertContext from "../context/alert/AlertContext";

export const Alert = () => {

  let context = useContext(AlertContext);
  const {alert} = context;

  
  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alert.type=='success'?"Success":"Error"}</strong>: {alert.msg}
        </div>
      )}
    </div>
  );
};

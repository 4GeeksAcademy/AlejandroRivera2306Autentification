import React, { Component, useState , useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";


const Form = () => {

const [email,  setEmail] = useState('')
const [ password, setPassword] = useState('')
const {actions, store} = useContext(Context)

function sendFormulario (){

Navigate ('/demodos')
}

function sendData (e){
    e.preventDefault()
    console.log('send Data')
    console.log(email,password)
    actions.login(email,password)
    
}


return (

<>
{store.auth == true ? <Navigate to='demo'/> : 

<form className="row g-3" onSubmit={sendData} >
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email"  value= {email} onChange ={(e)=> setEmail(e.target.value) }className="form-control" id="inputEmail4"/>
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" value= {password} onChange ={(e)=> setPassword(e.target.value) }  className="form-control" id="inputPassword4"/>
  </div>
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Sign in</button>
    <Link to="/demodos" className="btn btn-success" >Sign up</Link>
  </div>
</form>

}

 

</>

)
};
export default Form



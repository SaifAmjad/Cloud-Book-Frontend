import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
 let history = useNavigate();
const host='http://localhost:5000';
const[auth,setAuth]=useState({email:"",password:""});

const handleClick= async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/v1/auth/loginuser`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({email:auth.email,password:auth.password}),  
    });

    const jsondata = await response.json();
    console.log(jsondata);

    if (jsondata.success){
      // Save the auth token and redirect
      localStorage.setItem('token', jsondata.authtoken); 
      history.push("/");

  }
  else{
      alert("Invalid credentials");
  }


}

const onChange=(e)=>{
  setAuth({...auth,[e.target.name] : e.target.value});

}






  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={auth.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={auth.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

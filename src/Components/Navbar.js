import React,{useEffect} from 'react'
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';



const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    // Google Analytics
    console.log(location);
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Cloud-Book">Cloud Book</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <Link to="/login" type="button" className={`btn btn-primary mx-1 ${localStorage.getItem('token')===null?'invisible':'visible'} `} >Login</Link>
        <Link to="/signup" type="button" className={`btn btn-outline-primary mx-11  ${localStorage.getItem('token')===null?'invisible':'visible'}`}>Sign up</Link>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar

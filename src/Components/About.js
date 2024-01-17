import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const About = () => {
  
  return (
   <div> 
    {localStorage.getItem("token") === null?<div
        className={`alert alert-primary`}
        role="alert"
      >
        Please login or signup to start keeping your notes
      </div>:""}
This Application is for storing and managing your daily tasks</div>
  )
}

export default About

import React from 'react'
import { useNavigate } from "react-router-dom";

const Loutout=()=>{
    const navigate = useNavigate();
    localStorage.setItem('token',null);
    navigate('/signup');
}

export default Loutout;
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

import user_icon from "../assets/person.png";
import password_icon from "../assets/password.png";

const Login = () => {
  
  const [user,setUser] = useState("");
  const [password,setPassword] = useState("");
  

  const navigate = useNavigate();

  const onChangeUser = (e) => {
    const value = e.target.value
    setUser(value)

  }
  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)

  }

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post("http://localhost:3000/mahasiswa/tambahUser/",{
        user,
        password,
      });
      navigate("/home");
      toast.success("Data Berhasil Ditambahkan");
    } catch (error) {
      console.error(error);
    }
  };
 



  return (
    <div className="login-body">
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
         <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" name='user' id='user' placeholder="Username" value={user} onChange={onChangeUser} />
        </div>
        
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" name='password' id='password' placeholder="Password" value={password} onChange={onChangePassword} />
        </div>
      </div>

     <div className="forgot-password" onClick={()=> navigate("/login/lupaPassword") }>Lupa Password? <span>Click Here!!</span></div> 
      
      <div className="submit-container">
        <div className="submit" onClick={()=> navigate("/daftar") }>Daftar</div>
        <button className="submit" onClick={handleLogin}>Login</button>
        
      </div>
    </div>
    </div>
    
  )
}

export default Login
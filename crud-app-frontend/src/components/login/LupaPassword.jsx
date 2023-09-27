import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import email_icon from "../assets/email.png";

const LupaPassword = () => {
  
  const [email,setEmail] = useState("");

  const navigate = useNavigate();

 
  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)

  }



  return (
    <div className="login-body">
    <div className="container">
      <div className="header">
        <div className="text">Lupa Password ?</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
         
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" name='email' id='email' placeholder="Email" value={email} onChange={onChangeEmail}  />
        </div>
        
      </div>

     <div className="teks-pemberitahuan">Tulis email anda agar kami mengirimkan link untuk mengatur ulang password anda!!</div> 
      
      <div className="submit-container">
        <div className="submit" onClick={()=> navigate("/daftar") }>Daftar</div>
        <div className="submit">Login</div>
        
      </div>
    </div>
    </div>
    
  )
}

export default LupaPassword
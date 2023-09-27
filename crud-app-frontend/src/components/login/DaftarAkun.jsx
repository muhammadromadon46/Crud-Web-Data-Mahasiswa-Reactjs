import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const DaftarAkun = () => {

  const [user,setUser] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  const onChangeUser = (e) => {
    const value = e.target.value
    setUser(value)

  }
  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)

  }
  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)

  }

  const [dataUser,setDataUser]= useState([]);
  //GET DATA
  const getUser = async() => {
    try {
      const {data} = await axios.get("http://localhost:3000/mahasiswa/getUser");
      console.log(data.data);
      setDataUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  },[]);

  // ADD DATA
  const tambahUser = async (e) => {
    e.preventDefault();
    try {

      // DATA EXISTS
      await dataUser.find((data) => {
        if (data.email == email) {
          return toast.error(" Data Email Sudah Terdaftar!!");
          
        }
      });


      await axios.post("http://localhost:3000/mahasiswa/tambahUser/",{
        user,
        email,
        password,
      });
      //console.log(response);
      navigate("/");
      toast.success("Data Berhasil Ditambahkan");


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-body">
        
    <div className="container">

      <div className="header">
        <div className="text">Daftar</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
      
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" name='user' id='user' placeholder="Username" value={user} onChange={onChangeUser} required />
        </div>
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" name='email' id='email' placeholder="Email" value={email} onChange={onChangeEmail} required />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" name='password' id='password' placeholder="Password" value={password} onChange={onChangePassword} requi/>
        </div>

      </div>

     
      
      <div className="submit-container">
        <div className="submit" onClick={()=> navigate("/") }>Kembali</div>
        <button className="submit" onClick={tambahUser}>Daftar</button>
        
      </div>
    </div>
    
    </div>
    
  )
}

export default DaftarAkun
import { Routes, Route } from "react-router-dom"
import AppCRUD from "./components/AppCRUD";
import FormAddData from "./components/FormAddData";
import FormEditData from "./components/FormEditData";
import Login from "./components/login/Login";
import DaftarAkun from "./components/login/DaftarAkun";
import LupaPassword from "./components/login/LupaPassword";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  

  return (
    <div>
      
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/home/" Component={AppCRUD} />
        <Route path="/addData" Component={FormAddData} />
        <Route path="/editData/:id" Component={FormEditData} />
        <Route path="/daftar/" Component={DaftarAkun} />
        <Route path="/login/lupaPassword/" Component={LupaPassword} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    
    </div>
  )
}

export default App

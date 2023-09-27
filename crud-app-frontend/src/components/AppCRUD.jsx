import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";


const AppCRUD = () => {

  const [dataMahasiswa,setDataMahasiswa]= useState([]);
  const [order,setOrder]= useState("ASC");
  const sorting =(col) => {
    if (order === "ASC") {
      const sorted = [...dataMahasiswa].sort((a,b)=>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
      );
      setDataMahasiswa(sorted);
      setOrder("DSC");
      
    }
    if (order === "DSC") {
      const sorted = [...dataMahasiswa].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
      );
      setDataMahasiswa(sorted);
      setOrder("ASC");
      
    }
  };


  
  //GET DATA
  const getData = async() => {
    try {
      const {data} = await axios.get("http://localhost:3000/mahasiswa/getData");
      console.log(data.data);
      setDataMahasiswa(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  },[]);

  // DELETE DATA 

  const deleteData = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/mahasiswa/deleteData/${id}`);
      console.log(response);
      getData();
      toast.success("Data Berhasil dihapus");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h1 className="title">CRUD APLICATION</h1>
      <div className="app-crud">
      <Link to="/" className="log-button">
          Log Out 
        </Link>

        <Link to="/addData" className="tambah-data">
          Tambah Data 
        </Link>
        <table>
          <tbody>
            <tr>
              <th>NO</th>
              <th onClick={()=>sorting("npm")}>NIM</th>
              <th onClick={()=>sorting("nama")}>NAMA LENGKAP</th>
              <th onClick={()=>sorting("jurusan")}>JURUSAN</th>
              <th>ACTION</th>
            </tr>
            {dataMahasiswa.length ===0 ? (
              <tr>
                <td colSpan="5" style={{fontWeight: "bold", fontSize: "18px", paddingTop: "10px", paddingBottom:"10px"}}> Data Tidak Ada !!!</td>
              </tr>
            ) : ( 
              <>
              {dataMahasiswa.map((data, index) => {
              return(
                <tr key={data._id}>
                  <td style={{fontWeight:"bold"}}>{index + 1}</td>
                  <td>{data.npm}</td>
                  <td>{data.nama}</td>
                  <td>{data.jurusan}</td>
                  <td>
                    <Link to={`/editData/${data._id}`}>
                      <i className="fa-solid fa-pen-to-square" title="Edit Data"></i>
                    </Link>
                      <i className="fa-solid fa-trash" title="Delete Data" onClick={()=> {
                        return confirm("Apakah Kamu Yakin Untuk Menghapus Data Ini") ? deleteData(data._id) : ""
                      }}></i>
                  </td>
                </tr>
              );
            })}
              </>
            ) }
            
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppCRUD
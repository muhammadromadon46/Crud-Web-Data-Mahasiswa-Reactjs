import { useNavigate } from "react-router-dom"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const FormAddData = () => {
  const navigate = useNavigate();
  const [npm,setNPM] = useState("");
  const [ nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");

  const [dataMahasiswa,setDataMahasiswa]= useState([]);
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

  // ADD DATA
  const addData = async (e) => {
    e.preventDefault();
    try {

      // DATA EXISTS
      await dataMahasiswa.find((data) => {
        if (data.npm == npm) {
          return toast.error(" Data NIM Sudah Terdaftar!!");
          
        }
      });


      await axios.post("http://localhost:3000/mahasiswa/addData/",{
        npm,
        nama,
        jurusan,
      });
      //console.log(response);
      navigate("/");
      toast.success("Data Berhasil Ditambahkan");


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-add-data">
      <h1 className="title">CRUD APLICATION</h1>
      <form onSubmit={addData}>
        <table>
          <tbody>

            <tr>
              <td>
                <label htmlFor="nim">NIM</label>
              </td>
              <td>
                <input type="text" name="npm" id="npm" placeholder="Masukan NIM " value={npm} onChange={(e)=> setNPM(e.target.value)} required/>
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="nama">Nama Lengkap</label>
              </td>
              <td>
                <input type="text" name="nama" id="nama" placeholder="Masukan Nama Lengkap" autoComplete="off"  value={nama} onChange={(e)=> setNama(e.target.value)} required />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="jurusan">Jurusan</label>
              </td>
              <td>
                <select name="jurusan" id="jurusan"  value={jurusan} onChange={(e)=> setJurusan(e.target.value)} required>
                  <option value="">--Pilih Jurusan--</option>
                  <option value="Desain Web"> Desain Web </option>
                  <option value="Management Informatika"> Management Informatika </option>
                  <option value="Sistem Informasi"> Sistem Infromasi </option>
                  <option value="Teknik Informatika"> Teknik Informatika</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="btn">
                <button onClick={()=> navigate("/") }> Kembali </button>
                <button type="submit"> Save </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default FormAddData
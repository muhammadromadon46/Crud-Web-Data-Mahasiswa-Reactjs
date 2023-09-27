
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const FormEditData = () => {
  const navigate = useNavigate();
  const [npm,setNPM] = useState("");
  const [ nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const {id} = useParams();


  //GET DATA BY ID 
  useEffect(()=> {

    const getDataByID = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mahasiswa/getData/${id}`);
        console.log(response);
        setNPM(response.data.data.npm);
        setNama(response.data.data.nama);
        setJurusan(response.data.data.jurusan);
      } catch (error) {
        console.log(error);
      }
    };

    getDataByID();
  },[id]);


  // EDIT DATA
  const editData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/mahasiswa/editData/${id}`,{
        npm,
        nama,
        jurusan,
      });
      //console.log(response);
      navigate("/");
      toast.success("Data Berhasil diubah");


    } catch (error) {
      console.log(error);
    }
  }


  
  return (
    <div className="form-add-data">
      <h1 className="title">CRUD APLICATION</h1>
      <form onSubmit={editData}>
        <table>
          <tbody>

            <tr>
              <td>
                <label htmlFor="nim">NIM</label>
              </td>
              <td>
                <input type="text" name="npm" id="npm" placeholder="Masukan NIM " value={npm} onChange={(e)=> setNPM(e.target.value)} required disabled/>
              </td>
            </tr>  

            <tr>
              <td>
                <label htmlFor="nama">Nama Lengkap</label>
              </td>
              <td>
                <input type="text" name="nama" id="nama" placeholder="Masukan Nama Lengkap" value={nama} onChange={(e)=> setNama(e.target.value)} required />
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="jurusan">Jurusan</label>
              </td>
              <td>
                <select name="jurusan" id="jurusan" value={jurusan} onChange={(e)=> setJurusan(e.target.value)} required>
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
                <button type="submit">Edit Data </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default FormEditData
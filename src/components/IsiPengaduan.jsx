import React, { useState } from "react";
import app from "../firebaseConfig";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc,serverTimestamp,} from "firebase/firestore";
import "../styles/IsiPengaduan.css";


function IsiPengaduan() {
    const [judulPengaduan, setJudulPengaduan] = useState("");
    const [deskripsiAduan, setDeskripsiAduan] = useState("");
    const [file, setFile] = useState(null);

    const saveData = async () => {
  if (!judulPengaduan.trim() || !deskripsiAduan.trim()) {
    alert("Judul dan deskripsi pengaduan wajib diisi.");
    return;
  }

  try {
    const firestore = getFirestore(app);
    const storage = getStorage(app);
    let imageUrl = "";

    if (file) {
      const imageRef = storageRef(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(firestore, "pengaduan"), {
      judulPengaduan,
      deskripsiAduan,
      buktiGambar: imageUrl,
      timestamp: serverTimestamp(),
    });

    console.log("Firestore success, doc id:", docRef.id);
    alert("Data berhasil disimpan!");

    // Reset form
    setJudulPengaduan("");
    setDeskripsiAduan("");
    setFile(null);
  } catch (error) {
    console.error("Error saving data:", error);
    alert(`Error: ${error.message}`);
  }
};

      return (
        <div className="Pengaduan">
          <h2 className="judul">Form Pengaduan</h2>
    
          <div className="Judul">
            <subjudul>Judul Pengaduan</subjudul>
            <span className="required">*</span>
            <input
              type="text"
              className="input-judul"
              value={judulPengaduan}
              onChange={(e) => setJudulPengaduan(e.target.value)}
              placeholder="Judul Pengaduan"
            />
          </div>
    
          <div className="form-group">
            <subjudul>Deskripsi Aduan</subjudul>
            <span className="required">*</span>
            <textarea
              value={deskripsiAduan}
              onChange={(e) => setDeskripsiAduan(e.target.value)}
              placeholder="Deskripsi Aduan"
            />
          </div>
    
          <div className="form-group file-upload">
            <subjudul>Bukti Gambar</subjudul>
            <input
              type="file"
              className="input-bukti"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
    
          <button onClick={saveData}>Submit</button>
        </div>
      );
    }
    
    export default IsiPengaduan;
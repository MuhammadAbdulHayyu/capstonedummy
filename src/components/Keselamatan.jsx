import '../styles/Keselamatan.css';
import SIPHImage from '../Assets/1.png';
import SIPHImage2 from '../Assets/2.png';
import SIPHImage3 from '../Assets/3.png';
import SIPHImage4 from '../Assets/4.png';
import { useEffect } from 'react'; 
import ScrollReveal from "scrollreveal"; 

function Keselamatan() {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: "60px",
      duration: 2000,  
      delay: 300,
      reset: false, 
    });

    
    sr.reveal(".section", { origin: 'left', interval: 200 });

    
    sr.reveal(".section.reverse1", { origin: 'right', interval: 200 });

  }, []);
  return (
    <div className="content-container">
      <h1 className="judul no-reveal">Pentingnya Penggunaan Helm</h1>

      <div className="section">
        <div className="gambar">
          <img src={SIPHImage} alt="Penggunaan Helm" />
        </div>
        <div className="text1">
          <h2>Mengurangi Risiko Cedera Fatal</h2>
          <p>
            Helm berfungsi untuk melindungi kepala dari benturan keras yang bisa berakibat fatal. 
            Menggunakan helm secara benar dapat mengurangi kemungkinan cedera serius atau kematian akibat kecelakaan lalu lintas.
          </p>
        </div>
      </div>

      <div className="section reverse1">
        <div className="text1">
          <h2>Kewajiban Hukum</h2>
          <p>
             Berdasarkan Peraturan Pemerintah Republik Indonesia yang diatur dalam Pasal 57 ayat 
            (1) dan ayat (2) UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan (“UU No. 22/2009”) yang berbunyi:<br /><br />
            (1) Setiap Kendaraan Bermotor yang dioperasikan di Jalan wajib dilengkapi dengan perlengkapan Kendaraan Bermotor.<br /><br />
            (2) Perlengkapan sebagaimana dimaksud pada ayat (1) bagi Sepeda Motor berupa helm standar nasional Indonesia.
          </p>
        </div>
        <div className="gambar">
          <img src={SIPHImage2} alt="Kewajiban Helm" />
        </div>
      </div>

      <div className="section">
        <div className="gambar">
          <img src={SIPHImage3} alt="Keselamatan Kampus" />
        </div>
        <div className="text1">
          <h2>Keselamatan di Kampus</h2>
          <p>
            Lingkungan kampus yang sering padat dengan aktivitas mahasiswa, 
            helm membantu mencegah risiko kecelakaan. Penggunaan helm adalah langkah preventif untuk menjaga keamanan di area kampus.
          </p>
        </div>
      </div>

      <div className="section reverse1">
        <div className="text1">
          <h2>Contoh Kepedulian Terhadap Sesama</h2>
          <p>
            Menggunakan helm dengan benar menunjukkan tanggung jawab pribadi dan sosial. 
            Ini merupakan contoh yang baik bagi sesama mahasiswa dan pengendara lainnya.
          </p>
        </div>
        <div className="gambar">
          <img src={SIPHImage4} alt="Contoh Kepedulian" />
        </div>
      </div>
    </div>
  );
}

export default Keselamatan;

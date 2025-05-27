import '../styles/Tentang.css';
import SIPHImage from '../Assets/LOGOSIPHV2.png';
import { useEffect } from 'react'; 
import ScrollReveal from "scrollreveal"; 

function Tentang() {

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 2000,  
      delay: 300,
      reset: false, 
    });

    sr.reveal(".tentang-content", { origin:'right' });
    sr.reveal(".tentang-text", { origin:'left' }); 
  }, []);

  return (
    <div className="tentang-container">
      <div className="tentang-content">
        <div className="tentang-text">
          <h1>Tentang Sistem</h1>
          <p>
            Sistem monitoring ini dirancang untuk merekam aktivitas lalu lintas di lingkungan kampus 
            dan secara cerdas mendeteksi pelanggaran lalu lintas, seperti pengendara motor yang tidak memakai helm.
          </p>
        </div>
        <div className="tentang-image">
        <img src={SIPHImage} alt="Tentang Sistem" />
        </div>
      </div>
    </div>
  );
}

export default Tentang;

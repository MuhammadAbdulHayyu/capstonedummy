import '../styles/FrameAtas.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 
import ScrollReveal from "scrollreveal";
import Stream from "../components/Stream"; 

function FrameAtas() { 
  const navigate = useNavigate();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 2000,  
      delay: 300,
      reset: false, 
    });

    sr.reveal(".headerAtas", { interval: 200 });
    sr.reveal(".button-container", { interval: 300 }); 
  }, []);

  const scrollToStreaming = () => {
    const target = document.getElementById("Stream");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="background-overlay"></div>
      <div className="headerAtas">SISTEM IDENTIFIKASI PELANGGARAN HELM</div>
      <div className="button-container">
        <button className="button" onClick={scrollToStreaming}>Streaming</button>
        <button className="button" onClick={() => navigate('/DataPelanggaran')}>Data Pelanggaran</button>
        <button className="button" onClick={() => navigate('/Pengaduan')}>Pengaduan</button>
      </div>
    </div>
  );
}

export default FrameAtas;

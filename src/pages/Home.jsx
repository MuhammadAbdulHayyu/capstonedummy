import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FrameAtas from "../components/FrameAtas";
import Tentang from "../components/Tentang";
import Stream from "../components/Stream";
import Keselamatan from "../components/Keselamatan";
import '../styles/Home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <FrameAtas/>
      <Tentang/>
      <Stream/>
      <Keselamatan/>
      <Footer />
    </div>
  )
}

export default Home

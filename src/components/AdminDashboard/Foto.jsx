import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload, FaCalendarAlt } from "react-icons/fa";
import "../AdminDashboard/Foto.css";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const storage = getStorage();

const fetchImageAsBlob = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal fetch ${url}: ${response.status}`);
  }
  return await response.blob();
};

const FotoCard = React.memo(({ url, name, tanggal, onDownload }) => (
  <div className="foto-card">
    <div className="foto-wrapper">
      <img
        src={url}
        alt={name}
        className="foto-preview"
        loading="lazy"
      />
    </div>
    <div className="foto-info">
      <p>{tanggal}</p>
      <button onClick={() => onDownload(url, name)} className="download-btn">
        <FaDownload className="icon" />
        Download
      </button>
    </div>
  </div>
));

const Foto = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fotoList, setFotoList] = useState([]); // Array of { name, url, tanggal }
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const downloadCancelled = React.useRef(false);

  const itemsPerPage = 10;

  const formatDateKey = (date) => date.toISOString().split("T")[0];

  const formatReadableDate = (filename) => {
    const match = filename.match(/violation_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})/);
    if (!match) return "Tanggal tidak diketahui";
    const [_, date, time] = match;
    return `${date.split("-").reverse().join("-")}, ${time.replace(/-/g, ":")} WIB`;
  };

  useEffect(() => {
    const fetchFoto = async () => {
      setLoading(true);
      setFotoList([]);
      const folderRef = ref(storage, "pelanggaran");

      try {
        const res = await listAll(folderRef);
        const formattedDate = formatDateKey(selectedDate);

        const matchedItems = res.items.filter((item) =>
          item.name.includes(formattedDate)
        );

        const mapped = await Promise.all(
          matchedItems.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              name: item.name,
              url,
              tanggal: formatReadableDate(item.name),
            };
          })
        );

        setFotoList(mapped);
      } catch (error) {
        console.error("Gagal memuat foto:", error);
        setFotoList([]);
      }

      setLoading(false);
    };

    fetchFoto();
  }, [selectedDate]);

  const downloadImage = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    setProgress(0);
    downloadCancelled.current = false;
    const zip = new JSZip();

    try {
      for (let i = 0; i < fotoList.length; i++) {
        if (downloadCancelled.current) {
          console.log("Download dibatalkan");
          break;
        }

        const item = fotoList[i];
        try {
          const blob = await fetchImageAsBlob(item.url);
          zip.file(item.name, blob);
          setProgress(Math.round(((i + 1) / fotoList.length) * 100));
        } catch (err) {
          console.error("Gagal ambil blob:", item.name, err);
        }
      }

      if (!downloadCancelled.current) {
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `pelanggaran_${formatDateKey(selectedDate)}.zip`);
      }
    } catch (error) {
      console.error("Gagal membuat ZIP:", error);
    }

    setIsDownloading(false);
  };

  const cancelDownload = () => {
    downloadCancelled.current = true;
    setIsDownloading(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fotoList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(fotoList.length / itemsPerPage);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="adminfoto-container">
      <h3 className="title">Data Foto Pelanggaran</h3>

      <div className="calendar-container">
        <FaCalendarAlt className="calendar-icon" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setCurrentPage(1);
          }}
          dateFormat="dd-MM-yyyy"
          className="date-picker"
        />
      </div>

      <section className="content">
        {loading ? (
          <p>Memuat data foto...</p>
        ) : currentItems.length > 0 ? (
          currentItems.map((item) => (
            <FotoCard
              key={item.name}
              url={item.url}
              name={item.name}
              tanggal={item.tanggal}
              onDownload={downloadImage}
            />
          ))
        ) : (
          <p className="no-data">Tidak ada foto pada tanggal ini</p>
        )}
      </section>

      {fotoList.length > itemsPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => changePage(idx + 1)}
              className={`page-btn ${currentPage === idx + 1 ? "active" : ""}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {fotoList.length > 0 && !isDownloading && (
        <button className="all-download" onClick={handleDownloadAll}>
          Download All
        </button>
      )}

      {isDownloading && (
        <div className="download-progress">
          <p>Downloading... {progress}%</p>
          <progress value={progress} max="100" />
          <button onClick={cancelDownload} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Foto;

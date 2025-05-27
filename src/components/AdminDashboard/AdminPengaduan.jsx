import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './AdminPengaduan.css';

const AdminDashboard = () => {
  const [pengaduan, setPengaduan] = useState([]);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const fetchPengaduan = async () => {
    const pengaduanCollection = collection(db, 'pengaduan');
    const snapshot = await getDocs(pengaduanCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPengaduan(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus pengaduan ini?');
    if (!confirm) return;
    await deleteDoc(doc(db, 'pengaduan', id));
    fetchPengaduan();
  };

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'pengaduan', id), { status });
    fetchPengaduan();
    setSelectedPengaduan((prev) => ({
      ...prev,
      status: status,
    }));
  };

  useEffect(() => {
    fetchPengaduan();
  }, []);

  const formatWaktu = (timestamp) => {
    if (!timestamp?.toDate) return 'Waktu tidak tersedia';
    return timestamp.toDate().toLocaleString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Ambil semua tahun dari data
  const uniqueYears = Array.from(
    new Set(pengaduan.map(p => p.timestamp?.toDate?.()?.getFullYear()).filter(Boolean))
  );

  const filteredPengaduan = pengaduan.filter(p => {
    const date = p.timestamp?.toDate?.();
    const matchStatus = filterStatus ? p.status === filterStatus : true;
    const matchMonth = filterMonth ? (date?.getMonth() + 1) === parseInt(filterMonth) : true;
    const matchYear = filterYear ? date?.getFullYear() === parseInt(filterYear) : true;
    return matchStatus && matchMonth && matchYear;
  });

  if (selectedPengaduan) {
    return (
      <div className="detail-container">
        <button className="back-button" onClick={() => setSelectedPengaduan(null)}>←</button>
        <div className="judul">{selectedPengaduan.judulPengaduan}</div>
        <div className="deskripsi">{selectedPengaduan.deskripsiAduan}</div>
        <img className="foto-aduan" src={selectedPengaduan.buktiGambar} alt="Bukti" />
        <div className="waktu">Waktu: {formatWaktu(selectedPengaduan.timestamp)}</div>

        <div className="status-container">
          {['Belum Diproses', 'Diproses', 'Selesai'].map((status) => (
            <label
              key={status}
              className={`status-option ${
                selectedPengaduan.status === status
                  ? status === 'Belum Diproses'
                    ? 'status-belum'
                    : status === 'Diproses'
                    ? 'status-diproses'
                    : 'status-selesai'
                  : ''
              }`}
            >
              <input
                type="radio"
                checked={selectedPengaduan.status === status}
                onChange={() => handleStatusChange(selectedPengaduan.id, status)}
                style={{ display: 'none' }}
              />
              {status}
            </label>
          ))}
        </div>

        <button className="delete-button" onClick={() => handleDelete(selectedPengaduan.id)}>🗑️ Hapus</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Dashboard Pengaduan</h2>

      {/* Filter Status */}
      <div className="status-filter">
        {['Belum Diproses', 'Diproses', 'Selesai'].map((status) => (
          <label key={status}>
            <input
              type="radio"
              name="statusFilter"
              value={status}
              checked={filterStatus === status}
              onChange={() => setFilterStatus(status)}
            />
            {status}
          </label>
        ))}
        <label>
          <input
            type="radio"
            name="statusFilter"
            value=""
            checked={filterStatus === ''}
            onChange={() => setFilterStatus('')}
          />
          Semua
        </label>
      </div>

      {/* Filter Bulan dan Tahun */}
      <div className="tanggal-filter">
  <div className="filter-group">
    <label htmlFor="bulan">Bulan</label>
    <select
      id="bulan"
      value={filterMonth}
      onChange={(e) => setFilterMonth(e.target.value)}
    >
      <option value="">Semua</option>
      {Array.from({ length: 12 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
          {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
        </option>
      ))}
    </select>
  </div>

  <div className="filter-group">
    <label htmlFor="tahun">Tahun</label>
    <select
      id="tahun"
      value={filterYear}
      onChange={(e) => setFilterYear(e.target.value)}
    >
      <option value="">Semua</option>
      {uniqueYears.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  </div>
</div>

      {/* Tabel Pengaduan */}
      <div className="table-container">
        <table className="pengaduan-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Waktu</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengaduan.map((item, index) => (
              <tr key={item.id} onClick={() => setSelectedPengaduan(item)}>
                <td>{index + 1}</td>
                <td>{item.judulPengaduan}</td>
                <td>{formatWaktu(item.timestamp)}</td>
                <td>
                  <span className={
                    item.status === 'Diproses' ? 'status-diproses' :
                    item.status === 'Selesai' ? 'status-selesai' :
                    'status-belum'
                  }>
                    {item.status || 'Belum Diproses'}
                  </span>
                </td>
                <td className="aksi-cell">
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {filteredPengaduan.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Belum ada data pengaduan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

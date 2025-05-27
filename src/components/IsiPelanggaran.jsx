import React, { useEffect, useState } from "react";
import {PieChart,Pie,Cell,Tooltip,Legend,BarChart,Bar,XAxis,YAxis,CartesianGrid,ResponsiveContainer,} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ganti jika path berbeda
import "../styles/IsiPelanggaran.css";

const IsiPelanggaran = () => {
  const [dataMingguan, setDataMingguan] = useState([]);
  const [dataBulanan, setDataBulanan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jumlahMotorSnapshot = await getDocs(collection(db, "jumlah_motor"));
      let totalMotor = 0;
      let totalPelanggaran = 0;

      const bulanMap = {
        "01": "JAN", "02": "FEB", "03": "MAR", "04": "APR", "05": "MEI", "06": "JUN",
        "07": "JUL", "08": "AGU", "09": "SEP", "10": "OKT", "11": "NOV", "12": "DES"
      };

      const monthlyData = {};

      jumlahMotorSnapshot.forEach((doc) => {
        const data = doc.data();
        const tanggal = data.waktu_mulai?.split("_")[0]; // Format: yyyy-mm-dd
        const [tahun, bulan] = tanggal?.split("-") || [];
        const bulanStr = bulanMap[bulan] || "UNKNOWN";
        const labelBulanTahun = `${bulanStr} ${tahun}`;

        totalMotor += data.jumlah_motor || 0;
        totalPelanggaran += data.jumlah_pelanggaran || 0;

        if (!monthlyData[labelBulanTahun]) {
          monthlyData[labelBulanTahun] = {
            name: labelBulanTahun,
            pelanggaran: 0,
            kendaraan: 0
          };
        }

        monthlyData[labelBulanTahun].pelanggaran += data.jumlah_pelanggaran || 0;
        monthlyData[labelBulanTahun].kendaraan += data.jumlah_motor || 0;
      });

      setDataMingguan([
        { name: "Memakai Helm", value: totalMotor - totalPelanggaran, color: "#00b4d8" },
        { name: "Tidak Memakai Helm", value: totalPelanggaran, color: "#777" }
      ]);

      const sortedBulanan = Object.values(monthlyData).sort((a, b) => {
        const [bulanA, tahunA] = a.name.split(" ");
        const [bulanB, tahunB] = b.name.split(" ");
        const bulanUrut = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
        const indexA = bulanUrut.indexOf(bulanA) + parseInt(tahunA) * 12;
        const indexB = bulanUrut.indexOf(bulanB) + parseInt(tahunB) * 12;
        return indexA - indexB;
      });

      setDataBulanan(sortedBulanan.slice(-6)); // Ambil 6 bulan terakhir
    };

    fetchData();
  }, []);

  const totalKendaraan = dataMingguan.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="pelanggaran-container">
      <h2 className="judul">Data Statistik Jumlah Pelanggaran</h2>

      {/* Statistik Minggu Ini */}
      <div className="card">
        <h3 className="card-title">Statistik Minggu Ini</h3>
        <div className="card-body">
          <p>KENDARAAN MASUK</p>
          <h3>{totalKendaraan}</h3>
        </div>
        <div className="chart-content">
          <PieChart width={400} height={400}>
            <Pie data={dataMingguan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
              {dataMingguan.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div className="legend-container">
            {dataMingguan.map((entry, index) => (
              <div key={index} className="legend-box" style={{ backgroundColor: entry.color }}>
                {entry.name} <br /> {entry.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistik 6 Bulan Terakhir */}
      <div className="card">
        <h3 className="card-title">Data Statistik Jumlah Pelanggaran 6 Bulan Terakhir</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataBulanan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pelanggaran" fill="#00b4d8" name="Pelanggaran Helm" />
            <Bar dataKey="kendaraan" fill="#777" name="Jumlah Kendaraan Masuk" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IsiPelanggaran;

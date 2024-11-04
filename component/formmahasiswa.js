import React, { useState, useEffect } from 'react';

function MahasiswaForm() {
  const [formData, setFormData] = useState({
    npm: '',
    nama: '',
    kelas: ''
  });

  const [mahasiswa, setMahasiswa] = useState([]);
  const [message, setMessage] = useState('');

  // Mengambil data mahasiswa
  const fetchMahasiswa = async () => {
    try {
      const response = await fetch('http://localhost:3000/mahasiswa');
      const data = await response.json();
      setMahasiswa(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/mahasiswa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Data berhasil ditambahkan!');
        setFormData({ npm: '', nama: '', kelas: '' });
        fetchMahasiswa(); // Refresh data
      } else {
        setMessage('Gagal menambahkan data');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Data Mahasiswa</h1>
      
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">NPM:</label>
          <input
            type="text"
            name="npm"
            value={formData.npm}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Nama:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Kelas:</label>
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simpan
        </button>
      </form>

      {/* Tabel Data Mahasiswa */}
      <h2 className="text-xl font-bold mb-4">Data Mahasiswa</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">NPM</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kelas</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs, index) => (
            <tr key={index}>
              <td className="border p-2">{mhs.npm}</td>
              <td className="border p-2">{mhs.nama}</td>
              <td className="border p-2">{mhs.kelas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MahasiswaForm;
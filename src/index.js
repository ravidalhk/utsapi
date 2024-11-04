import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Menyimpan data di memory (untuk contoh)
let mahasiswa = [];

// CREATE - Menambah data mahasiswa
app.post('/mahasiswa', (req, res) => {
    const { npm, nama, kelas } = req.body;
    
    // Validasi input
    if (!npm || !nama || !kelas) {
        return res.status(400).json({ 
            message: 'NPM, Nama, dan Kelas harus diisi' 
        });
    }

    // Cek NPM duplikat
    const exists = mahasiswa.find(m => m.npm === npm);
    if (exists) {
        return res.status(400).json({ 
            message: 'NPM sudah terdaftar' 
        });
    }

    const newMahasiswa = { npm, nama, kelas };
    mahasiswa.push(newMahasiswa);
    
    res.status(201).json({
        message: 'Data mahasiswa berhasil ditambahkan',
        data: newMahasiswa
    });
});

// READ - Mengambil semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
    res.json({
        message: 'Data mahasiswa berhasil diambil',
        data: mahasiswa
    });
});

// READ - Mengambil data mahasiswa berdasarkan NPM
app.get('/mahasiswa/:npm', (req, res) => {
    const mhs = mahasiswa.find(m => m.npm === req.params.npm);
    
    if (!mhs) {
        return res.status(404).json({ 
            message: 'Mahasiswa tidak ditemukan' 
        });
    }
    
    res.json({
        message: 'Data mahasiswa ditemukan',
        data: mhs
    });
});

// UPDATE - Mengupdate data mahasiswa
app.put('/mahasiswa/:npm', (req, res) => {
    const { nama, kelas } = req.body;
    const index = mahasiswa.findIndex(m => m.npm === req.params.npm);
    
    if (index === -1) {
        return res.status(404).json({ 
            message: 'Mahasiswa tidak ditemukan' 
        });
    }
    
    mahasiswa[index] = {
        ...mahasiswa[index],
        nama: nama || mahasiswa[index].nama,
        kelas: kelas || mahasiswa[index].kelas
    };
    
    res.json({
        message: 'Data mahasiswa berhasil diupdate',
        data: mahasiswa[index]
    });
});

// DELETE - Menghapus data mahasiswa
app.delete('/mahasiswa/:npm', (req, res) => {
    const index = mahasiswa.findIndex(m => m.npm === req.params.npm);
    
    if (index === -1) {
        return res.status(404).json({ 
            message: 'Mahasiswa tidak ditemukan' 
        });
    }
    
    mahasiswa.splice(index, 1);
    
    res.json({
        message: 'Data mahasiswa berhasil dihapus'
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});     
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicController;
use App\Models\Presensi;
use Inertia\Inertia;
use App\Models\ProfilSekolah;
use App\Models\GuruStaff;
use App\Models\SaranaPrasarana;
use App\Models\Post;
use App\Models\ProgramKeahlian; // Tambahkan ini
// Pastikan model sudah di-import
use App\Models\Siswa;

// Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/', function () {
    return Inertia::render('Home', [
        'posts' => Post::latest()->take(3)->get(),
        // Tambahkan baris ini untuk mengirim data profil ke komponen Home
        'profil' => ProfilSekolah::first(),
        'programs' => ProgramKeahlian::all(), // Kirim data program ke React
        'dataGuru' => GuruStaff::all() // Mengirim data guru ke halaman Home
    ]);
});


// Tambahkan baris ini untuk halaman baca artikel
Route::get('/berita/{slug}', [PublicController::class, 'show'])->name('berita.show');

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/kiosk', function () {
    return view('kiosk');
});

Route::get('/kehadiran', function () {
    $hariIni = now()->toDateString();

    // Ambil data presensi hari ini, urutkan dari yang terbaru melakukan scan
    $presensiHariIni = Presensi::with('siswa')
        ->where('tanggal', $hariIni)
        ->orderBy('updated_at', 'desc')
        ->get();

    return Inertia::render('Kehadiran', [
        'presensi' => $presensiHariIni,
        'tanggal' => now()->translatedFormat('l, d F Y') // Format: Senin, 19 September 2026
    ]);
});

Route::get('/profil', function () {
    return Inertia::render('Profil', [
        // Mengambil data profil pertama (karena sejarah/visi misi biasanya hanya 1 baris data)
        'profil' => ProfilSekolah::first(),
        // Mengambil semua data guru & staff
        'guruStaff' => GuruStaff::orderBy('kategori')->get(),
        // Mengambil semua data fasilitas
        'sarpras' => SaranaPrasarana::all()
    ]);
});



Route::get('/berita/{slug}', function ($slug) {
    // Mencari berita berdasarkan slug, jika tidak ada kembalikan 404
    $post = Post::where('slug', $slug)->firstOrFail();

    return Inertia::render('BeritaDetail', [
        'post' => $post
    ]);
});

Route::get('/berita', [App\Http\Controllers\PublicController::class, 'berita'])->name('berita.index');

Route::get('/guru-staf', function () {
    return Inertia::render('Frontend/DirektoriGuru', [
        // Mengambil semua data guru, bisa diganti paginate(12) jika data sangat banyak
        'dataGuru' => GuruStaff::all()
    ]);
});

Route::get('/siswa', function () {
    return Inertia::render('Frontend/DirektoriSiswa', [
        // Mengambil semua data siswa
        'dataSiswa' => Siswa::all()
    ]);
});



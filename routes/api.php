<?php

use App\Models\Siswa;
use App\Models\Presensi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- API 1: PRESENSI MASUK & PULANG ---
Route::post('/scan-kehadiran', function (Request $request) {
    $kode = $request->input('kode');
    $siswa = Siswa::where('barcode_uid', $kode)->orWhere('nis', $kode)->first();

    if (!$siswa) return response()->json(['message' => 'Data tidak dikenali'], 404);

    $hariIni = now()->toDateString();
    $waktuSekarang = now()->toTimeString();
    
    // Cek apakah hari ini siswa sudah absen
    $presensi = Presensi::where('siswa_id', $siswa->id)->where('tanggal', $hariIni)->first();

    if (!$presensi) {
        // BELUM ABSEN -> Proses Absen Masuk
        $statusHadir = $waktuSekarang > '07:15:00' ? 'terlambat' : 'hadir';
        Presensi::create([
            'siswa_id' => $siswa->id,
            'tanggal' => $hariIni,
            'waktu_scan' => $waktuSekarang,
            'status' => $statusHadir
        ]);
        return response()->json(['message' => 'Absen Masuk sukses', 'siswa' => $siswa->nama], 200);
    } else {
        // SUDAH ABSEN MASUK -> Cek Absen Pulang
        if ($presensi->waktu_pulang) {
            return response()->json(['message' => 'Anda sudah melakukan Absen Pulang hari ini.'], 400);
        }

        // Validasi waktu pulang (Misal: minimal jam 14:00 baru boleh pulang)
        if ($waktuSekarang < '14:00:00') {
            return response()->json(['message' => 'Anda sudah Absen Masuk. Belum waktunya pulang!'], 400);
        }

        // Proses Absen Pulang
        $presensi->update(['waktu_pulang' => $waktuSekarang]);
        return response()->json(['message' => 'Absen Pulang sukses. Hati-hati di jalan!', 'siswa' => $siswa->nama], 200);
    }
});

// --- API 2: PENDAFTARAN & PEMBARUAN WAJAH ---
Route::post('/register-face', function (Request $request) {
    $siswa = Siswa::where('nis', $request->nis)->first();
    if (!$siswa) return response()->json(['message' => 'NIS tidak ditemukan'], 404);

    // Cek apakah wajah sudah ada DAN bukan perintah pembaruan paksa (force)
    if ($siswa->face_descriptor && !$request->input('force_update')) {
        return response()->json(['message' => 'Wajah Anda sudah terdaftar di sistem. Ingin memperbarui data wajah?'], 409);
    }

    $siswa->update([
        'face_descriptor' => json_encode(array_values($request->descriptor))
    ]);

    $pesan = $request->input('force_update') ? 'Wajah berhasil diperbarui!' : 'Wajah berhasil didaftarkan!';
    return response()->json(['message' => $pesan], 200);
});

Route::get('/get-faces', function () {
    // Ambil data siswa yang sudah merekam wajah
    $siswas = \App\Models\Siswa::whereNotNull('face_descriptor')->get(['nis', 'nama', 'face_descriptor']);
    
    $data = $siswas->map(function ($siswa) {
        return [
            'nis' => $siswa->nis,
            'nama' => $siswa->nama,
            'descriptor' => json_decode($siswa->face_descriptor)
        ];
    });

    return response()->json($data);
});
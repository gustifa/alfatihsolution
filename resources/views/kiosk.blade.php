<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kiosk Presensi Wajah & Barcode</title>
    <!-- Tailwind CSS via CDN untuk Kiosk -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">

    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">KIOSK PRESENSI</h1>
        <p class="text-gray-400">Silakan arahkan wajah atau scan barcode Anda ke kamera</p>
    </div>

    <!-- Area Kamera -->
    <div class="relative w-[640px] h-[480px] bg-black rounded-xl overflow-hidden border-4 border-gray-700 shadow-2xl">
        <!-- Kamera untuk Wajah (Face API) -->
        <video id="videoElement" class="absolute top-0 left-0 w-full h-full object-cover" autoplay muted></video>
        <!-- Overlay Kamera untuk Barcode -->
        <div id="reader" class="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none"></div>
    </div>

    <div id="statusResult" class="mt-8 text-2xl font-bold text-green-400 h-10">
        Siap memindai...
    </div>

    <!-- Library Barcode -->
    <script src="https://unpkg.com/html5-qrcode"></script>
    <!-- Library Face API -->
    <script src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"></script>
    <!-- Library SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        const statusResult = document.getElementById('statusResult');
        let isProcessing = false;

        // ==========================================
        // 1. FUNGSI KIRIM DATA KE DATABASE (API)
        // ==========================================
        async function catatKehadiran(kodeData, metodeScan) {
    if (isProcessing) return;
    isProcessing = true;

    // Tampilkan loading screen
    Swal.fire({
        title: 'Memproses...',
        text: 'Mencatat data kehadiran',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        let response = await fetch('/api/scan-kehadiran', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kode: kodeData, metode: metodeScan })
        });
        
        let result = await response.json();
        
        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: `Selamat datang, ${result.siswa}!`,
                timer: 2500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Perhatian',
                text: result.message,
                timer: 2500,
                showConfirmButton: false
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Koneksi Gagal',
            text: 'Terjadi kesalahan jaringan!',
            timer: 2500,
            showConfirmButton: false
        });
    }

    // Kembalikan Kiosk ke mode siap scan setelah alert tertutup
    setTimeout(() => {
        isProcessing = false;
    }, 3000);
}

        // ==========================================
        // 2. SISTEM SCAN BARCODE
        // ==========================================
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            { facingMode: "user" }, // Gunakan kamera depan
            { fps: 10, qrbox: { width: 400, height: 400 } },
            (decodedText) => {
                catatKehadiran(decodedText, 'barcode');
            },
            (errorMessage) => { /* Abaikan error pencarian frame */ }
        );

        // ==========================================
// 3. SISTEM SCAN WAJAH (AI Models & Matcher)
// ==========================================
const video = document.getElementById('videoElement');
let faceMatcher = null;

// Fungsi memuat data wajah dari database
async function loadRegisteredFaces() {
    try {
        let response = await fetch('/api/get-faces');
        let siswas = await response.json();
        
        if(siswas.length === 0) return null;

        const labeledDescriptors = siswas.map(siswa => {
            // Kembalikan array biasa menjadi Float32Array agar bisa dibaca AI
            const arr = new Float32Array(siswa.descriptor);
            // Gunakan NIS sebagai label identitas
            return new faceapi.LabeledFaceDescriptors(siswa.nis, [arr]); 
        });

        // Toleransi kecocokan 0.5 (semakin kecil semakin ketat)
        return new faceapi.FaceMatcher(labeledDescriptors, 0.5); 
    } catch (e) {
        console.error("Gagal memuat data wajah", e);
        return null;
    }
}

// Memuat model AI dan Data Wajah dari server secara paralel
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(async () => {
    statusResult.innerHTML = `<span class="text-yellow-400">Menyinkronkan data wajah siswa...</span>`;
    faceMatcher = await loadRegisteredFaces();
    startVideo();
}).catch(err => {
    console.error("Gagal memuat AI:", err);
    statusResult.innerHTML = `<span class="text-red-500">Error memuat AI!</span>`;
});

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { 
            video.srcObject = stream; 
            statusResult.innerHTML = "Kamera & AI siap memindai...";
        })
        .catch(err => console.error("Kamera tidak ditemukan", err));
}

const urlParams = new URLSearchParams(window.location.search);
const registerNis = urlParams.get('register_nis');

if (registerNis) {
    statusResult.innerHTML = `Mode Pendaftaran: NIS ${registerNis}. Tahan wajah Anda...`;
}

video.addEventListener('play', () => {
    setInterval(async () => {
        if (isProcessing) return;

        const detection = await faceapi.detectSingleFace(video)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detection) {
            if (registerNis) {
    isProcessing = true;
    
    Swal.fire({
        title: 'Merekam Wajah...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => { Swal.showLoading(); }
    });
    
    try {
        let response = await fetch('/api/register-face', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nis: registerNis, descriptor: Array.from(detection.descriptor) })
        });
        
        let result = await response.json();
        
        if(response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Pendaftaran Selesai',
                text: result.message,
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                // Hapus parameter dari URL untuk kembali ke mode presensi
                window.location.href = '/kiosk';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: result.message,
                timer: 2500,
                showConfirmButton: false
            });
            setTimeout(() => isProcessing = false, 3000);
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Gagal terhubung ke server',
            timer: 2500,
            showConfirmButton: false
        });
        setTimeout(() => isProcessing = false, 3000);
    }
}
            else if (faceMatcher) {
                // LOGIKA PRESENSI NORMAL
                const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
                
                if (bestMatch.label !== 'unknown' && bestMatch.distance < 0.5) {
                    // Wajah dikenali! Kirim NIS (label) ke API Presensi
                    catatKehadiran(bestMatch.label, 'wajah');
                } else {
                    // Tampilkan pesan sekilas tanpa memblokir sistem
                    statusResult.innerHTML = `<span class="text-red-500">Wajah tidak dikenali</span>`;
                    setTimeout(() => { 
                        if(!isProcessing) statusResult.innerHTML = "Siap memindai..."; 
                    }, 1500);
                }
            }
        }
    }, 1500);
});



        // Catatan: Untuk menjalankan pengenalan wajah secara penuh, 
        // kita perlu mendownload file model AI (weights) ke folder public/models/
        // dan melakukan komparasi array (faceMatcher) dari database Filament.
    </script>
</body>
</html>
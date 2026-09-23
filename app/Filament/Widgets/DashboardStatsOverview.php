<?php

namespace App\Filament\Widgets;

use App\Models\Siswa;
use App\Models\Presensi;
use App\Models\JurnalPiket;
use App\Models\GuruStaff;
use App\Models\Post;
use App\Models\Rombel;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardStatsOverview extends BaseWidget
{
    // Memastikan widget ini berada di urutan teratas pada halaman dasbor
    protected static ?int $sort = 1;

    // Durasi pembaruan otomatis (polling) tanpa perlu refresh halaman
    protected static ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        $user = Auth::user();
        $stats = [];


        $hariIni = Carbon::today();

        // 1. Ambil data total siswa
        $totalSiswa = Siswa::count();

        // 2. Ambil data siswa yang berstatus hadir pada hari ini
        $hadirHariIni = Presensi::whereDate('tanggal', $hariIni)
            ->where('status', 'hadir')
            ->count();

        // 3. Ambil data jurnal yang sudah diserahkan tapi belum disetujui Kepsek
        $jurnalPending = JurnalPiket::where('status', 'diserahkan')->count();

        return [
            Stat::make('Total Siswa', $totalSiswa)
                ->description('Seluruh siswa terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),

            Stat::make('Hadir Hari Ini', $hadirHariIni)
                ->description('Siswa yang telah melakukan scan')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('success')
                // Menambahkan garis grafik visual (dummy/statis untuk estetika)
                ->chart([2, 5, 8, 12, 10, 15, $hadirHariIni]),

            Stat::make('Jurnal Menunggu Approval', $jurnalPending)
                ->description('Membutuhkan persetujuan Kepsek')
                ->descriptionIcon($jurnalPending > 0 ? 'heroicon-m-exclamation-circle' : 'heroicon-m-check-circle')
                // Warna berubah menjadi oranye (warning) jika ada tumpukan, hijau jika kosong
                ->color($jurnalPending > 0 ? 'warning' : 'success'),

            // Stat::make('Jumlah Guru & Staff', GuruStaff::count())
            //     ->description('Pendidik & Tenaga Kependidikan')
            //     ->descriptionIcon('heroicon-m-academic-cap')
            //     ->color('success'),

            // Stat::make('Jumlah Rombel', Rombel::count())
            //     ->description('Rombongan belajar aktif')
            //     ->descriptionIcon('heroicon-m-building-office-2')
            //     ->color('info'),

            // Stat::make('Total Postingan', Post::count())
            //     ->description('Artikel & berita publikasi')
            //     ->descriptionIcon('heroicon-m-newspaper')
            //     ->color('primary'),
        ];
    }
}

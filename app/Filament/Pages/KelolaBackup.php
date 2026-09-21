<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Storage;
use Filament\Forms\Components\Select;

class KelolaBackup extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';
    protected static ?string $navigationGroup = 'Sistem';
    protected static string $view = 'filament.pages.kelola-backup';
    protected static ?string $title = 'Kelola Backup Sekolah';

    protected function getHeaderActions(): array
    {
        return [
            // --- 1. TOMBOL: DOWNLOAD BACKUP ---
            Action::make('downloadBackup')
                ->label('Download Backup')
                ->color('info')
                ->icon('heroicon-o-arrow-down-circle')
                ->modalHeading('Unduh File Backup')
                ->modalDescription('Pilih file cadangan database (ZIP) yang ingin Anda unduh ke perangkat ini.')
                ->form([
                    Select::make('backup_file')
                        ->label('Pilih File Backup')
                        ->options(function () {
                            $disk = Storage::disk('local');
                            // Jika nama folder backup Anda di config/backup.php berbeda, ubah 'Laravel' menjadi nama folder tersebut
                            $files = $disk->files('Laravel');

                            $options = [];
                            foreach ($files as $file) {
                                if (pathinfo($file, PATHINFO_EXTENSION) === 'zip') {
                                    $sizeMb = round($disk->size($file) / 1024 / 1024, 2);
                                    // Menyimpan $file (path asli dari Storage) sebagai value, dan nama file sebagai label
                                    $options[$file] = basename($file) . ' (' . $sizeMb . ' MB)';
                                }
                            }
                            return array_reverse($options);
                        })
                        ->searchable()
                        ->required(),
                ])
                ->action(function (array $data) {
                    // $data['backup_file'] sudah berisi path relatif dari storage/app, misalnya 'Laravel/backup-2026.zip'
                    // Gunakan Storage::disk('local')->path() agar sistem Windows otomatis menyesuaikan garis miring (\ atau /)
                    $filePath = Storage::disk('local')->path($data['backup_file']);

                    if (file_exists($filePath)) {
                        return response()->download($filePath);
                    }

                    Notification::make()
                        ->title('Gagal Mengunduh')
                        ->body('File tersebut sudah tidak ada atau telah dipindahkan dari folder storage/app/' . $data['backup_file'])
                        ->danger()
                        ->send();
                }),
            // --- 1. TOMBOL BARU: IMPORT DATABASE ---
            Action::make('importDatabase')
                ->label('Import Database')
                ->color('warning')
                ->icon('heroicon-o-arrow-up-tray')
                ->requiresConfirmation()
                ->modalHeading('Import Data (Restore)')
                ->modalDescription('PERINGATAN: Mengimpor database akan menimpa data yang ada saat ini! Silakan ekstrak file ZIP hasil backup Anda terlebih dahulu, lalu unggah file berekstensi .sql (berada di dalam folder db-dumps).')
                ->form([
                    FileUpload::make('file_sql')
                        ->label('Unggah File SQL (.sql)')
                        ->disk('local')
                        ->directory('database-imports')
                        ->acceptedFileTypes(['text/plain', 'application/sql', 'application/x-sql'])
                        ->required(),
                ])
                ->action(function (array $data) {
                    // Ambil lokasi file SQL yang baru saja diunggah
                    $filePath = storage_path('app/' . $data['file_sql']);

                    // Ambil data koneksi dari file .env
                    $dbName = env('DB_DATABASE', 'laravel');
                    $dbUser = env('DB_USERNAME', 'root');
                    $dbPass = env('DB_PASSWORD', '');

                    // Lokasi aplikasi psql (pasangan dari pg_dump yang Anda temukan sebelumnya)
                    $psqlPath = 'D:\nginx\pgsql\bin\psql.exe';

                    // Perintah CMD untuk PostgreSQL Restore
                    $perintahCmd = "set PGPASSWORD={$dbPass}&& \"{$psqlPath}\" -U {$dbUser} -d {$dbName} -f \"{$filePath}\"";

                    // Eksekusi CMD di latar belakang (Bypass Nginx)
                    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                        pclose(popen("start /B cmd /c \"{$perintahCmd}\"", "r"));
                    } else {
                        exec("PGPASSWORD={$dbPass} psql -U {$dbUser} -d {$dbName} -f \"{$filePath}\" > /dev/null 2>&1 &");
                    }

                    Notification::make()
                        ->title('Proses Import Dimulai!')
                        ->body('Sistem sedang mengeksekusi file SQL ke dalam database. Data baru akan segera tersedia.')
                        ->success()
                        ->send();
                }),
            Action::make('runBackup')
                ->label('Mulai Backup Sekarang')
                ->color('success')
                ->icon('heroicon-o-arrow-down-tray')
                ->requiresConfirmation()
                ->modalHeading('Mencadangkan Data')
                ->modalDescription('Apakah Anda yakin ingin memulai proses pencadangan database sistem sekarang?')
                ->action(function () {
                    // 1. Ambil alamat akurat folder proyek Anda (D:\nginx\html\branding-sekolah)
                    $basePath = base_path();

                    // 2. Buat perintah murni Command Prompt (CMD)
                    $perintahCmd = 'php artisan backup:run --only-db --disable-notifications';

                    // 3. Eksekusi secara paksa di sistem operasi (mem-bypass Nginx)
                    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                        // Trik untuk Windows: Buka CMD tersembunyi (start /B) dan jalankan
                        pclose(popen("start /B cmd /c \"cd /d {$basePath} && {$perintahCmd}\"", "r"));
                    } else {
                        // Trik untuk Linux/Hosting: Jalankan di latar belakang
                        exec("cd {$basePath} && {$perintahCmd} > /dev/null 2>&1 &");
                    }

                    // 4. Tampilkan pesan berhasil
                    Notification::make()
                        ->title('Proses Backup Dipicu!')
                        ->body('Sistem sedang mengeksekusi pencadangan di latar belakang (layaknya menggunakan Command Prompt). Silakan periksa folder storage/app/Laravel Anda dalam 1-2 menit ke depan.')
                        ->success()
                        ->send();
                }),
        ];
    }
}

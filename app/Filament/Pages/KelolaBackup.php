<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Illuminate\Support\Facades\Artisan;
use Filament\Notifications\Notification;

class KelolaBackup extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';

    protected static ?string $navigationGroup = 'Sistem';

    protected static string $view = 'filament.pages.kelola-backup';

    protected static ?string $title = 'Kelola Backup Sekolah';

    // Merakit tombol eksekusi di sudut kanan atas halaman
    protected function getHeaderActions(): array
    {
        return [
            Action::make('runBackup')
                ->label('Mulai Backup Sekarang')
                ->color('success')
                ->icon('heroicon-o-arrow-down-tray')
                ->requiresConfirmation()
                ->modalHeading('Mencadangkan Data')
                ->modalDescription('Apakah Anda yakin ingin memulai proses pencadangan database sistem sekarang?')
                ->action(function () {
                    // Memaksa eksekusi perintah terminal di latar belakang
                    Artisan::call('backup:run', ['--only-db' => true]);

                    Notification::make()
                        ->title('Backup Selesai!')
                        ->body('Database telah berhasil dicadangkan dan diamankan.')
                        ->success()
                        ->send();
                }),
        ];
    }
}

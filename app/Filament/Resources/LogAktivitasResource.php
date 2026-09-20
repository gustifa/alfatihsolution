<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LogAktivitasResource\Pages;
use Spatie\Activitylog\Models\Activity;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class LogAktivitasResource extends Resource
{
    protected static ?string $model = Activity::class;

    // Menggunakan ikon riwayat dari Heroicons
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    
    // Mengelompokkan menu di sidebar
    protected static ?string $navigationGroup = 'Sistem';
    
    protected static ?string $pluralModelLabel = 'Log Aktivitas';

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu Aktivitas')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('causer.name')
                    ->label('Aktor (Pengguna)')
                    ->searchable()
                    ->default('Sistem / Guest'),
                    
                Tables\Columns\TextColumn::make('description')
                    ->label('Status Aksi')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'created' => 'success', // Hijau untuk tambah data
                        'updated' => 'warning', // Kuning untuk edit data
                        'deleted' => 'danger',  // Merah untuk hapus data
                        default => 'gray',
                    }),
                    
                Tables\Columns\TextColumn::make('log_name')
                    ->label('Kategori')
                    ->searchable(),
                    
                Tables\Columns\TextColumn::make('subject_type')
                    ->label('Target Modul')
                    // Memotong format path class panjang menjadi nama akhir saja (misal: Post)
                    ->formatStateUsing(fn ($state) => $state ? class_basename($state) : '-'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                // Anda bisa menambahkan filter tanggal nanti di sini
            ])
            ->actions([])
            ->bulkActions([]);
    }

    // --- BLOKIR HAK AKSES MANIPULASI LOG ---
    
    public static function canCreate(): bool
    {
        return false; // Nonaktifkan tombol tambah
    }

    public static function canEdit(\Illuminate\Database\Eloquent\Model $record): bool
    {
        return false; // Nonaktifkan akses edit
    }
    
    public static function canDelete(\Illuminate\Database\Eloquent\Model $record): bool
    {
        return false; // Nonaktifkan akses hapus individu
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLogAktivitas::route('/'),
        ];
    }
}
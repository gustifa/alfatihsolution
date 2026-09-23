<?php

namespace App\Filament\Imports;

use App\Models\Siswa;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;

class SiswaImporter extends Importer
{
    protected static ?string $model = Siswa::class;
    public static function getSupportedFileExtensions(): array
    {
        return [
            'xlsx',
            'xls',
            'csv',
        ];
    }

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('nis')
                ->label('NIS')
                ->requiredMapping()
                ->rules(['required', 'string', 'max:30']),
            ImportColumn::make('nama')
                ->label('Nama Siswa')
                ->requiredMapping()
                ->rules(['required', 'string', 'max:255']),
            ImportColumn::make('kelas')
                ->label('Kelas')
                ->requiredMapping()
                ->rules(['required', 'string', 'max:50']),
            ImportColumn::make('jenis_kelamin')
                ->label('Jenis Kelamin')
                ->rules(['nullable', 'string']),
        ];
    }

    public function resolveRecord(): ?Siswa
    {
        return Siswa::firstOrNew([
            'nis' => $this->data['nis'],
        ]);
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = 'Impor data siswa selesai: ' . number_format($import->successful_rows) . ' data berhasil disimpan.';

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' data gagal diproses.';
        }

        return $body;
    }
}

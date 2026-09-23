<?php

namespace App\Filament\Resources\SiswaResource\Pages;

use App\Filament\Resources\SiswaResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use App\Filament\Imports\SiswaImporter;
use Filament\Actions\ImportAction;
use Filament\Actions\CreateAction;

class ListSiswas extends ListRecords
{
    protected static string $resource = SiswaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ImportAction::make()
            ->importer(SiswaImporter::class)
            ->label('Impor Siswa')
            ->modalHeading('Impor Data Siswa')
            ->modalDescription('Unggah berkas Excel (.xlsx) atau CSV sesuai templat.')
            ->color('success')
            ->icon('heroicon-o-arrow-up-tray'),
            CreateAction::make(),
        ];
    }
}

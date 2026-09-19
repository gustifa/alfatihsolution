<?php

namespace App\Filament\Resources\JurnalPiketResource\Pages;

use App\Filament\Resources\JurnalPiketResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditJurnalPiket extends EditRecord
{
    protected static string $resource = JurnalPiketResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

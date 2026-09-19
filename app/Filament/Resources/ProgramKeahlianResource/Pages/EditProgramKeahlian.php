<?php

namespace App\Filament\Resources\ProgramKeahlianResource\Pages;

use App\Filament\Resources\ProgramKeahlianResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProgramKeahlian extends EditRecord
{
    protected static string $resource = ProgramKeahlianResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Resources\ConsultationOrderResource\Pages;

use App\Filament\Resources\ConsultationOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditConsultationOrder extends EditRecord
{
    protected static string $resource = ConsultationOrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

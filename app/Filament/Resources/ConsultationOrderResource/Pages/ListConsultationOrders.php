<?php

namespace App\Filament\Resources\ConsultationOrderResource\Pages;

use App\Filament\Resources\ConsultationOrderResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListConsultationOrders extends ListRecords
{
    protected static string $resource = ConsultationOrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

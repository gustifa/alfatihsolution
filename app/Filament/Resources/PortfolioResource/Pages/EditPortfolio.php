<?php

namespace App\Filament\Resources\PortfolioResource\Pages;

use App\Filament\Resources\PortfolioResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Validation\ValidationException;

class EditPortfolio extends EditRecord
{
    protected static string $resource = PortfolioResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function onValidationError(ValidationException $exception): void
    {
        $this->dispatch('swal', [
            'icon' => 'warning',
            'title' => 'Periksa Isian Form!',
            'text' => 'Pastikan kolom wajib tidak dibiarkan kosong.',
            'confirmButtonColor' => '#2563eb',
        ]);

        parent::onValidationError($exception);
    }

    protected function afterSave(): void
    {
        $this->dispatch('swal', [
            'icon' => 'success',
            'title' => 'Perubahan Tersimpan!',
            'text' => 'Data portofolio berhasil diperbarui.',
            'timer' => 2000,
            'showConfirmButton' => false,
        ]);
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}

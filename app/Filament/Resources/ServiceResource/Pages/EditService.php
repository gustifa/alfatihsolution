<?php

namespace App\Filament\Resources\ServiceResource\Pages;

use App\Filament\Resources\ServiceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Validation\ValidationException;

class EditService extends EditRecord
{
    protected static string $resource = ServiceResource::class;

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
            'text' => 'Pastikan seluruh kolom wajib telah diisi.',
            'confirmButtonColor' => '#2563eb',
        ]);

        parent::onValidationError($exception);
    }

    protected function afterSave(): void
    {
        $this->dispatch('swal', [
            'icon' => 'success',
            'title' => 'Perubahan Tersimpan!',
            'text' => 'Data layanan berhasil diperbarui.',
            'timer' => 2000,
            'showConfirmButton' => false,
        ]);
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}

<?php

namespace App\Filament\Resources\ServiceResource\Pages;

use App\Filament\Resources\ServiceResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreateService extends CreateRecord
{
    protected static string $resource = ServiceResource::class;

    protected function onValidationError(ValidationException $exception): void
    {
        $this->dispatch('swal', [
            'icon' => 'warning',
            'title' => 'Form Belum Lengkap!',
            'text' => 'Harap isi nama layanan dan deskripsi singkat dengan benar.',
            'confirmButtonColor' => '#2563eb',
        ]);

        parent::onValidationError($exception);
    }

    protected function afterCreate(): void
    {
        $this->dispatch('swal', [
            'icon' => 'success',
            'title' => 'Layanan Berhasil Ditambahkan!',
            'text' => 'Layanan baru kini telah aktif di sistem dan siap tampil di landing page.',
            'timer' => 2000,
            'showConfirmButton' => false,
        ]);
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}

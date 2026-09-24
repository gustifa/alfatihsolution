<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;

    // Trigger SweetAlert jika form tidak lolos validasi (misal: deskripsi belum diisi)
    protected function onValidationError(ValidationException $exception): void
    {
        $this->dispatch('swal', [
            'icon' => 'warning',
            'title' => 'Form Belum Lengkap!',
            'text' => 'Harap lengkapi semua kolom yang wajib diisi (termasuk Nama Produk dan Deskripsi).',
            'confirmButtonColor' => '#2563eb',
        ]);

        parent::onValidationError($exception);
    }

    // Trigger SweetAlert saat produk berhasil disimpan
    protected function afterCreate(): void
    {
        $this->dispatch('swal', [
            'icon' => 'success',
            'title' => 'Berhasil Disimpan!',
            'text' => 'Data modul produk berhasil ditambahkan ke katalog.',
            'timer' => 2000,
            'showConfirmButton' => false,
        ]);
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}

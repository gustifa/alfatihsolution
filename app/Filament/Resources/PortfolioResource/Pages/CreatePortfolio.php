<?php

namespace App\Filament\Resources\PortfolioResource\Pages;

use App\Filament\Resources\PortfolioResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreatePortfolio extends CreateRecord
{
    protected static string $resource = PortfolioResource::class;

    protected function onValidationError(ValidationException $exception): void
    {
        $this->dispatch('swal', [
            'icon' => 'warning',
            'title' => 'Form Belum Lengkap!',
            'text' => 'Harap lengkapi judul proyek, deskripsi, dan gambar utama.',
            'confirmButtonColor' => '#2563eb',
        ]);

        parent::onValidationError($exception);
    }

    protected function afterCreate(): void
    {
        $this->dispatch('swal', [
            'icon' => 'success',
            'title' => 'Portofolio Ditambahkan!',
            'text' => 'Proyek berhasil disimpan dan siap ditampilkan di landing page.',
            'timer' => 2000,
            'showConfirmButton' => false,
        ]);
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}

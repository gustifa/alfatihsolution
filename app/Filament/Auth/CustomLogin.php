<?php

namespace App\Filament\Auth; // Perbarui baris ini

use Filament\Pages\Auth\Login as BaseAuth;
use Illuminate\Contracts\Support\Htmlable;

class CustomLogin extends BaseAuth
{
    public function getTitle(): string | Htmlable
    {
        return 'Masuk Portal Akademik';
    }

    public function getHeading(): string | Htmlable
    {
        return 'Portal Manajemen Sekolah';
    }

    public function getSubheading(): string | Htmlable | null
    {
        return 'Silakan masuk menggunakan kredensial administrator Anda.';
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilSekolah extends Model
{
    protected $guarded = [];

    // Tambahkan blok kode ini
    protected $casts = [
        'gambar_hero' => 'array',
    ];
}

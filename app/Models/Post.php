<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; // <-- Pastikan menggunakan path import ini

class Post extends Model
{
    // 1. Izinkan seluruh kolom untuk diisi (Mass Assignment)
    protected $guarded = [];

    // 2. Buat relasi ke tabel users sebagai 'author'
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}

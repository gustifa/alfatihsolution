<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// 1. Jalur Trait LogsActivity yang benar
use Spatie\Activitylog\Models\Concerns\LogsActivity;

// 2. Jalur LogOptions yang benar berdasarkan dokumentasi resmi Spatie v5
use Spatie\Activitylog\Support\LogOptions;

class Post extends Model
{
    // Aktifkan kembali trait ini
    use LogsActivity; 

    protected $guarded = [];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Aktifkan kembali fungsi konfigurasi log ini
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->dontLogEmptyChanges() // <-- Ubah bagian ini
            ->useLogName('Manajemen Berita');
    }
}
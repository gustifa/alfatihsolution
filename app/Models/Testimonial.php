<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'rating' => 'integer',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'urutan' => 'integer',
    ];

    /**
     * Testimoni untuk layanan tertentu
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}

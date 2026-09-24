<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceTicket extends Model
{
    use HasFactory;

    // protected $guarded = ['id'];
    protected $guarded = [];

    protected $casts = [
        'biaya_sparepart' => 'decimal:2',
        'biaya_jasa' => 'decimal:2',
        'total_biaya' => 'decimal:2',
        'tanggal_masuk' => 'datetime',
        'tanggal_selesai' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($ticket) {
            if (empty($ticket->no_tiket)) {
                $ticket->no_tiket = 'SRV-' . date('Ymd') . '-' . rand(100, 999);
            }
            if ($ticket->total_biaya == 0) {
                $ticket->total_biaya = ($ticket->biaya_sparepart ?? 0) + ($ticket->biaya_jasa ?? 0);
            }
        });
    }

    /**
     * Terhubung ke data konsultasi/lead awal (jika ada)
     */
    public function consultationOrder(): BelongsTo
    {
        return $this->belongsTo(ConsultationOrder::class);
    }

    /**
     * Teknisi yang menangani (User/Admin)
     */
    public function teknisi(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teknisi_id');
    }
}

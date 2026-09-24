<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ConsultationOrder extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'budget_estimasi' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($order) {
            if (empty($order->kode_pesanan)) {
                $order->kode_pesanan = 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));
            }
        });
    }

    /**
     * Layanan yang diminati/dipesan
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Produk yang diminati (jika order modul ajar / source code)
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Tiket servis jika permintaan berkaitan dengan reparasi perangkat
     */
    public function serviceTicket(): HasOne
    {
        return $this->hasOne(ServiceTicket::class);
    }
}

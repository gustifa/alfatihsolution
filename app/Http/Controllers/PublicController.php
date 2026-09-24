<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\Testimonial;
use App\Models\ServiceTicket;
use App\Models\ConsultationOrder;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'services' => Service::where('is_active', true)->orderBy('urutan')->get(),
            'portfolios' => Portfolio::with('service')->where('is_featured', true)->latest()->take(6)->get(),
            'products' => Product::where('is_active', true)->latest()->take(6)->get(),
            'testimonials' => Testimonial::where('is_published', true)->orderByDesc('is_featured')->take(6)->get(),
            'posts' => class_exists(Post::class) ? Post::latest()->take(3)->get() : [],
        ]);
    }

    public function trackService(Request $request)
    {
        $request->validate(['no_tiket' => 'required|string']);
        $ticket = ServiceTicket::with('teknisi')->where('no_tiket', trim($request->no_tiket))->first();

        if (!$ticket) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nomor tiket ' . e($request->no_tiket) . ' tidak ditemukan dalam sistem.'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'no_tiket' => $ticket->no_tiket,
                'nama_pelanggan' => $ticket->nama_pelanggan,
                'perangkat' => $ticket->nama_perangkat,
                'status_servis' => ucfirst(str_replace('_', ' ', $ticket->status_servis)),
                'status_raw' => $ticket->status_servis,
                'keluhan' => $ticket->keluhan_kerusakan,
                'tindakan' => $ticket->tindakan_perbaikan ?: 'Perangkat sedang dalam antrean diagnosa teknisi.',
                'biaya' => 'Rp ' . number_format($ticket->total_biaya, 0, ',', '.'),
                'status_bayar' => ucfirst($ticket->status_pembayaran),
                'tanggal_masuk' => $ticket->tanggal_masuk ? $ticket->tanggal_masuk->format('d M Y - H:i') . ' WIB' : '-',
            ]
        ]);
    }

    public function order(Request $request)
    {
        $validated = $request->validate([
            'nama_klien' => 'required|string|max:100',
            'no_whatsapp' => 'required|string|max:25',
            'service_id' => 'nullable|exists:services,id',
            'catatan_kebutuhan' => 'required|string|max:1000',
        ]);

        $order = ConsultationOrder::create($validated);

        $layanan = $order->service ? $order->service->nama_layanan : 'Layanan IT / Edukasi';
        $waAdmin = '6281234567890'; // Ganti nomor WhatsApp tujuan

        $pesan = urlencode(
            "Halo Tim Al-Fatih Solution,\n\n" .
            "Saya ingin konsultasi/order layanan:\n" .
            "• Nama / Instansi: {$order->nama_klien}\n" .
            "• Layanan: {$layanan}\n" .
            "• Detail Kebutuhan:\n{$order->catatan_kebutuhan}\n\n" .
            "Mohon info ketersediaan dan estimasi biayanya. Terima kasih!"
        );

        return response()->json([
            'status' => 'success',
            'redirect_wa' => "https://wa.me/{$waAdmin}?text={$pesan}"
        ]);
    }
}

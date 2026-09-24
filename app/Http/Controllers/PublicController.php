<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\Testimonial;
use App\Models\ServiceTicket;
use App\Models\ConsultationOrder;
use App\Models\Post;
use App\Models\CompanyProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        $profil = CompanyProfile::first();

        return Inertia::render('Home', [
            'profil' => $profil ? [
                'nama' => $profil->nama_perusahaan,
                'slogan' => $profil->slogan,
                'alamat' => $profil->alamat,
                'telepon' => $profil->telepon,
                'email' => $profil->email,
                'hero_tagline' => $profil->hero_tagline,
                'hero_title' => $profil->hero_title,
                'hero_subtitle' => $profil->hero_subtitle,
                'whatsapp_admin' => $profil->whatsapp_admin ?: ($profil->telepon ? preg_replace('/[^0-9]/', '', $profil->telepon) : '6281234567890'),
            ] : null,
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
                'tindakan' => $ticket->tindakan_perbaikan ?: 'Perangkat dalam proses diagnosa oleh teknisi.',
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
        $layanan = $order->service ? $order->service->nama_layanan : 'Konsultasi IT & Edukasi';

        $profil = CompanyProfile::first();
        $targetWa = $profil && $profil->whatsapp_admin
            ? preg_replace('/[^0-9]/', '', $profil->whatsapp_admin)
            : ($profil && $profil->telepon ? preg_replace('/[^0-9]/', '', $profil->telepon) : '6281234567890');

        if (str_starts_with($targetWa, '0')) {
            $targetWa = '62' . substr($targetWa, 1);
        }

        $namaPerusahaan = $profil->nama_perusahaan ?? 'Al-Fatih Solution';

        $pesan = urlencode(
            "Halo Admin {$namaPerusahaan},\n\n" .
            "Saya ingin memesan / konsultasi layanan:\n" .
            "• *Nama / Instansi*: {$order->nama_klien}\n" .
            "• *Layanan*: {$layanan}\n" .
            "• *Kebutuhan*:\n{$order->catatan_kebutuhan}\n\n" .
            "Mohon informasi estimasi biaya dan waktu pengerjaannya. Terima kasih!"
        );

        return response()->json([
            'status' => 'success',
            'redirect_wa' => "https://wa.me/{$targetWa}?text={$pesan}"
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\ServiceTicket;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function track(Request $request)
    {
        $request->validate([
            'no_tiket' => 'required|string',
        ]);

        $noTiket = trim($request->input('no_tiket'));

        try {
            // Carian mengikut no_tiket pada jadual service_tickets
            $ticket = ServiceTicket::whereRaw('UPPER(no_tiket) = ?', [strtoupper($noTiket)])->first();

            if (!$ticket) {
                return response()->json([
                    'status'  => 'error',
                    'message' => "Nombor tiket {$noTiket} tidak dijumpai dalam rekod pangkalan data.",
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data'   => [
                    'no_tiket'      => $ticket->no_tiket,
                    'pelanggan'     => $ticket->nama_pelanggan ?? '-',
                    'perangkat'     => $ticket->nama_perangkat ?? 'Peranti Pelanggan',
                    'status_servis' => $ticket->status_servis ?? 'Diterima',
                    'biaya'         => 'IDR ' . number_format($ticket->total_biaya ?? 0, 2, ',', '.'),
                    'status_bayar'  => $ticket->status_bayar ?? 'Belum Lunas',
                    'tindakan'      => $ticket->tindakan ?? $ticket->keterangan ?? $ticket->kerusakan ?? 'Peranti telah diterima dan sedang dalam antrean pemeriksaan teknisi.',
                    'tanggal_masuk' => $ticket->created_at ? $ticket->created_at->translatedFormat('d M Y H:i') : ($ticket->tanggal_masuk ?? '-'),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Ralat pangkalan data: ' . $e->getMessage(),
            ], 500);
        }
    }
}

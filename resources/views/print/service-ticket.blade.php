<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nota Servis - {{ $ticket->no_tiket }}</title>
    <style>
        * { box-sizing: border-box; font-family: 'Courier New', Courier, monospace; }
        body { margin: 0; padding: 20px; background-color: #f8fafc; color: #1e293b; font-size: 13px; }
        .ticket-box {
            max-width: 400px;
            margin: 0 auto;
            background: #fff;
            padding: 24px;
            border: 1px dashed #94a3b8;
            border-radius: 8px;
        }
        .header { text-align: center; border-bottom: 2px dashed #334155; padding-bottom: 12px; margin-bottom: 16px; }
        .header h2 { margin: 0 0 4px; font-size: 18px; font-weight: bold; }
        .header p { margin: 0; font-size: 11px; color: #475569; }
        .barcode-box {
            text-align: center;
            background: #f1f5f9;
            padding: 8px;
            border-radius: 6px;
            margin-bottom: 16px;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .info-label { color: #64748b; font-size: 12px; }
        .info-value { font-weight: bold; text-align: right; }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            background: #e0f2fe;
            color: #0369a1;
            font-size: 11px;
            text-transform: uppercase;
        }
        .footer {
            border-top: 1px dashed #cbd5e1;
            margin-top: 16px;
            padding-top: 12px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
            line-height: 1.4;
        }
        .btn-print {
            display: block;
            width: 100%;
            padding: 10px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 16px;
        }
        @media print {
            body { background: #fff; padding: 0; }
            .ticket-box { border: none; max-width: 100%; width: 100%; padding: 0; }
            .btn-print { display: none; }
        }
    </style>
</head>
<body>

<div class="ticket-box">
    <div class="header">
        <h2>AL-FATIH SOLUTION</h2>
        <p>Software House & IT Hardware Solution</p>
        <p>Bukittinggi, Sumatera Barat • Telp/WA: 0812-3456-7890</p>
    </div>

    <div class="barcode-box">
        {{ $ticket->no_tiket }}
    </div>

    <div class="info-row">
        <span class="info-label">Tarikh Masuk:</span>
        <span class="info-value">{{ $ticket->created_at ? $ticket->created_at->format('d/m/Y H:i') : ($ticket->tanggal_masuk ?? date('d/m/Y H:i')) }}</span>
    </div>

    <div class="info-row">
        <span class="info-label">Nama Pelanggan:</span>
        <span class="info-value">{{ $ticket->nama_pelanggan }}</span>
    </div>

    <div class="info-row">
        <span class="info-label">Peranti / Unit:</span>
        <span class="info-value">{{ $ticket->nama_perangkat }}</span>
    </div>

    <div class="info-row">
        <span class="info-label">Status Servis:</span>
        <span class="info-value"><span class="badge">{{ $ticket->status_servis }}</span></span>
    </div>

    <div class="info-row">
        <span class="info-label">Anggaran / Kos:</span>
        <span class="info-value">IDR {{ number_format($ticket->total_biaya ?? 0, 2, ',', '.') }}</span>
    </div>

    @if(!empty($ticket->keluhan) || !empty($ticket->keterangan))
    <div style="margin-top: 10px; padding: 8px; background: #f8fafc; border-radius: 4px; font-size: 11px;">
        <strong>Catatan / Kerosakan:</strong><br>
        {{ $ticket->keluhan ?? $ticket->keterangan }}
    </div>
    @endif

    <div class="footer">
        <p>Simpan nota ini sebagai bukti pengambilan peranti.</p>
        <p>Semak status pembaikan secara atas talian di portal kami menggunakan nombor tiket di atas.</p>
        <p><em>Terima kasih atas kepercayaan anda!</em></p>
    </div>

    <button class="btn-print" onclick="window.print()">🖨️ Cetak Nota Ini</button>
</div>

<script>
    // Automatik membuka dialog cetakan semasa halaman dibuka
    window.onload = function() {
        window.print();
    }
</script>

</body>
</html>

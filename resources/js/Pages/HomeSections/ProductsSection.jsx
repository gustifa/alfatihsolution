// Fitur Bagikan / Share Modul Beserta Gambar Sampul
const handleShare = async (item) => {
  const shareUrl = window.location.origin + "#modul";
  const shareText = `📚 *${item.nama_produk}*\n${item.deskripsi ? item.deskripsi.substring(0, 100) + "..." : ""}\n\nCek selengkapnya di: ${shareUrl}`;

  // Jalur gambar cover dari database
  const rawImage = item.cover_buku || item.gambar || item.thumbnail;
  const imageUrl = rawImage
    ? rawImage.startsWith("http") || rawImage.startsWith("/storage/")
      ? rawImage
      : `/storage/${rawImage}`
    : null;

  try {
    let shareFiles = [];

    // Jika terdapat gambar sampul, ubah menjadi Blob/File agar ikut terlampir
    if (imageUrl) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const fileType = blob.type || "image/jpeg";
        const fileExt = fileType.split("/")[1] || "jpg";
        const file = new File(
          [blob],
          `cover-${item.slug || "modul"}.${fileExt}`,
          {
            type: fileType,
          },
        );
        shareFiles = [file];
      } catch (err) {
        console.warn(
          "Gagal memuat gambar untuk share, melanjutkan share teks saja.",
          err,
        );
      }
    }

    // Siapkan objek data share
    const shareData = {
      title: item.nama_produk,
      text: shareText,
      url: shareUrl,
    };

    // Sertakan file jika didukung oleh browser
    if (
      shareFiles.length > 0 &&
      navigator.canShare &&
      navigator.canShare({ files: shareFiles })
    ) {
      shareData.files = shareFiles;
    }

    // Eksekusi Web Share API
    if (
      navigator.share &&
      (!shareData.files ||
        (navigator.canShare && navigator.canShare(shareData)))
    ) {
      await navigator.share(shareData);
      return;
    }

    throw new Error("Web Share API tidak didukung browser ini");
  } catch (err) {
    if (err.name !== "AbortError") {
      // Fallback jika dibatalkan atau browser desktop belum support share file langsung:
      // Salin tautan ke Clipboard & tampilkan notifikasi
      navigator.clipboard.writeText(shareText);
      Swal.fire({
        icon: "success",
        title: "Tautan & Ringkasan Disalin!",
        text: "Detail modul telah disalin ke papan klip. Anda dapat langsung menempelkannya (paste) di WhatsApp atau media sosial.",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  }
};

import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ScrollToTop from "@/Components/ScrollToTop";
import { fadeInUp, staggerContainer } from "@/Components/Animations";

export default function BeritaDetail({ post, relatedPosts = [] }) {
  const { url, props } = usePage();
  const dataPengaturan = props.pengaturanWeb || {};
  const namaSekolah = dataPengaturan.nama_sekolah || "SDN 59 Payakumbuh";

  // Memastikan Base URL selalu valid dan absolut (HTTPS)
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : props.appUrl || "https://sdn59.sch.id";

  const fullUrl = `${baseUrl}${url}`;
  const [currentUrl, setCurrentUrl] = useState(fullUrl);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const tanggalFormat = post?.created_at
    ? new Date(post.created_at).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Gambar thumbnail wajib berupa URL absolut lengkap dengan https://
  const gambarThumbnail = post?.featured_image
    ? post.featured_image.startsWith("http")
      ? post.featured_image
      : `${baseUrl}/storage/${post.featured_image}`
    : dataPengaturan?.logo
      ? `${baseUrl}/storage/${dataPengaturan.logo}`
      : `${baseUrl}/images/default-berita.jpg`;

  const metaDeskripsi =
    post?.meta_description ||
    (post?.content
      ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 160)
      : "Baca selengkapnya mengenai berita ini di situs resmi sekolah kami.");

  // Salin Tautan ke Clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Web Share API Bawaan Smartphone (Android / iOS)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: metaDeskripsi,
          url: currentUrl,
        });
      } catch (err) {
        console.log("Berbagi dibatalkan", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 scroll-smooth relative overflow-hidden">
      <Head>
        <title>{`${post?.title || "Berita"} - ${namaSekolah}`}</title>
        <meta name="description" content={metaDeskripsi} />

        {dataPengaturan.favicon && (
          <link
            rel="icon"
            type="image/png"
            href={`/storage/${dataPengaturan.favicon}`}
          />
        )}

        {/* OPEN GRAPH KHUSUS WHATSAPP & MEDIA SOSIAL */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={namaSekolah} />
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={metaDeskripsi} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={gambarThumbnail} />
        <meta property="og:image:secure_url" content={gambarThumbnail} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* TWITTER / X CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={metaDeskripsi} />
        <meta name="twitter:image" content={gambarThumbnail} />
      </Head>

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header Thumbnail Berita */}
          <div className="h-64 sm:h-96 w-full bg-blue-900 relative group">
            <img
              src={gambarThumbnail}
              alt={post?.title}
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

            <div className="absolute top-6 left-6 z-10">
              <Link
                href="/#berita"
                className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center shadow-lg border border-white/30 hover:-translate-x-1"
              >
                &larr; Kembali
              </Link>
            </div>

            <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
              <span className="bg-yellow-500 text-blue-900 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                {post?.category?.name || "Informasi"}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-5 leading-tight drop-shadow-lg">
                {post?.title}
              </h1>
            </div>
          </div>

          {/* Info Penulis & Waktu */}
          <div className="px-6 sm:px-10 py-6 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-4 md:gap-8 items-center text-sm text-gray-500 font-medium">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {tanggalFormat}
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>
                Oleh {post?.author?.name || post?.user?.name || "Admin / Humas"}
              </span>
            </div>
          </div>

          {/* Isi Konten Artikel */}
          <div className="p-6 sm:p-10">
            <div
              className="prose prose-lg max-w-none text-gray-700 text-justify prose-headings:text-blue-900 prose-a:text-blue-600 hover:prose-a:text-blue-800
                [&_figure]:flex [&_figure]:flex-col [&_figure]:items-center [&_figure]:mx-auto [&_figure]:my-8 [&_figure]:text-center
                [&_img]:mx-auto [&_img]:rounded-2xl [&_img]:shadow-md
                [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:italic [&_figcaption]:text-center
                [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-6 [&_ul]:ml-6 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />

            {/* Tag Berita */}
            {post?.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-500 mr-2">
                  Tag Terkait:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100 hover:bg-blue-100 transition"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* FITUR BAGIKAN ARTIKEL */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    Bagikan Artikel Ini:
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Sebarkan informasi bermanfaat ini kepada orang lain.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent((post?.title || "") + "\n\n" + currentUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Bagikan ke WhatsApp"
                    className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post?.title || "")}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Bagikan ke Telegram"
                    className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Bagikan ke Facebook"
                    className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post?.title || "")}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Bagikan ke X"
                    className="w-10 h-10 rounded-xl bg-neutral-900 hover:bg-black text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.965h-1.969z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Bagikan ke LinkedIn"
                    className="w-10 h-10 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post?.title || "")}&body=${encodeURIComponent(metaDeskripsi + "\n\nBaca artikel selengkapnya: " + currentUrl)}`}
                    title="Kirim via Email"
                    className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>

                  {/* Salin Tautan */}
                  <button
                    onClick={handleCopyLink}
                    title="Salin Tautan"
                    className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>

                  {/* Web Share API */}
                  <button
                    onClick={handleNativeShare}
                    title="Lainnya"
                    className="w-10 h-10 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Toast Notifikasi Berhasil Salin */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200 inline-flex"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tautan artikel berhasil disalin ke papan klip!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* SECTION POSTINGAN TERKAIT */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Rekomendasi Bacaan
                </h3>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Postingan Terkait
                </h2>
              </div>
              <Link
                href="/berita"
                className="text-sm font-semibold text-blue-600 hover:text-yellow-500 transition"
              >
                Lihat Semua &rarr;
              </Link>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {relatedPosts.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group border border-gray-100"
                >
                  <div className="h-40 bg-gray-200 overflow-hidden relative">
                    <img
                      src={
                        item.featured_image
                          ? `/storage/${item.featured_image}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&background=random`
                      }
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    {item.category && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {item.category.name}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase mb-2">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                      <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                    </h4>

                    <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-grow">
                      {item.meta_description ||
                        "Baca selengkapnya mengenai berita ini."}
                    </p>

                    <Link
                      href={`/berita/${item.slug}`}
                      className="text-xs font-bold text-blue-600 group-hover:text-blue-800 flex items-center gap-1 mt-auto"
                    >
                      Baca Selengkapnya
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

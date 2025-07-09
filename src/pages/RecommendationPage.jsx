import React, { useState } from "react";
import RecommendForm from "../components/RecommendForm";
import { Header } from "../components/header";

const API_URL = "https://urbanrayajakarta-ai-be.up.railway.app/recommendations/custom";

const RecommendationPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data tempat spesial Jakarta/Taman Hiburan
  const specialPlaces = [
    { name: "Taman Ismail Marzuki" },
    { name: "J-Sky FerrisWheel" },
    { name: "Cibugary Farm" },
    { name: "Taman Suropati" },
  ];

  // State untuk form terakhir yang dikirim
  const [lastForm, setLastForm] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setRecommendations([]);
    setLastForm(formData); // simpan form terakhir
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Gagal mendapatkan rekomendasi");
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // Untuk highlight score tinggi
  const getScoreColor = (score) => {
    if (score >= 0.7) return "bg-green-200 text-green-800";
    if (score >= 0.6) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-10 px-4">
        <div className="mb-10">
          <RecommendForm onSubmit={handleSubmit} loading={loading} />
        </div>
        {error && (
          <div className="max-w-xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        {!loading && recommendations.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-main mb-4">Hasil Rekomendasi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <div
                  key={rec.Place_Id}
                  className={
                    `rounded-lg overflow-hidden shadow-md bg-white p-4 flex flex-col justify-between border border-gray-100 transition-transform duration-200 hover:scale-105 hover:shadow-xl relative animate-fadeIn` +
                    (idx < 3 ? " ring-2 ring-main/30" : "")
                  }
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-semibold text-main mb-1 flex items-center gap-2">
                      {rec.Place_Name}
                      {idx === 0 && (
                        <span className="bg-main text-white text-xs px-2 py-0.5 rounded-full ml-1">Top</span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">{rec.City} &bull; {rec.Category}</p>
                    <p className="text-xs text-gray-500 mb-2">ID: {rec.Place_Id}</p>
                    <div className="flex flex-wrap gap-2 text-xs mb-2">
                      <span className={getScoreColor(rec.Score) + " px-2 py-1 rounded font-semibold"}>Score: {rec.Score.toFixed(3)}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Popularitas: {rec.Popularity_Score.toFixed(2)}</span>
                      {rec.Price === 0 ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded font-semibold">Gratis</span>
                      ) : (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">Harga: Rp{rec.Price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Section tambahan untuk Jakarta atau Taman Hiburan, hanya salah satu */}
            {lastForm && lastForm.location && lastForm.location.toLowerCase().includes("jakarta") ? (
              <div className="mt-10 bg-yellow-50 border-l-4 border-main p-6 rounded-xl animate-fadeIn">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 min-w-[220px]">
                    <h4 className="text-main font-bold text-lg mb-2">Jelajahi Jakarta Lebih Seru!</h4>
                    <p className="mb-2 text-main">Selain rekomendasi di atas, kamu juga wajib coba destinasi favorit warga Jakarta berikut ini. Tiket event untuk 4 tempat ini bisa langsung kamu pesan di web Ekswara:</p>
                    <ul className="list-disc ml-6 text-main font-medium mb-4">
                      {specialPlaces.map((p) => (
                        <li key={p.name}>{p.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-end flex-shrink-0">
                    <a
                      href="/event"
                      className="bg-main text-white px-5 py-2 rounded-md font-semibold shadow hover:bg-secondary transition w-full sm:w-auto text-center"
                    >
                      Event Ekswara
                    </a>
                    <a
                      href="/destination"
                      className="bg-white border border-main text-main px-5 py-2 rounded-md font-semibold shadow hover:bg-main hover:text-white transition w-full sm:w-auto text-center"
                    >
                      Cek detailnya di sini
                    </a>
                  </div>
                </div>
              </div>
            ) : lastForm && lastForm.category_preference && lastForm.category_preference.toLowerCase() === "taman hiburan" ? (
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl animate-fadeIn">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 min-w-[220px]">
                    <h4 className="text-blue-700 font-bold text-lg mb-2">Mau Liburan Seru di Taman Hiburan?</h4>
                    <p className="mb-2 text-blue-700">Selain rekomendasi utama, berikut taman hiburan hits yang bisa kamu kunjungi di Jakarta. Tiket event untuk 4 tempat ini bisa langsung kamu pesan di web Ekswara:</p>
                    <ul className="list-disc ml-6 text-blue-700 font-medium mb-4">
                      {specialPlaces.map((p) => (
                        <li key={p.name}>{p.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-end flex-shrink-0">
                    <a
                      href="/event"
                      className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto text-center"
                    >
                      Event Ekswara
                    </a>
                    <a
                      href="/destination"
                      className="bg-white border border-blue-600 text-blue-700 px-5 py-2 rounded-md font-semibold shadow hover:bg-blue-600 hover:text-white transition w-full sm:w-auto text-center"
                    >
                      Cek detailnya di sini
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
        {!loading && recommendations.length === 0 && !error && (
          <div className="max-w-xl mx-auto text-center text-gray-400 mt-10">
            Silakan isi form di atas untuk mendapatkan rekomendasi wisata.
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default RecommendationPage;

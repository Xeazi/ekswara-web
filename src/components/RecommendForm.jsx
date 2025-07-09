import React, { useState } from "react";

const LOCATIONS = [
  "Bandung, Jawa Barat",
  "Bekasi, Jawa Barat",
  "Bogor, Jawa Barat",
  "Cilacap, Jawa Tengah",
  "Cirebon, Jawa Barat",
  "Depok, Jawa Barat",
  "Jakarta Barat, DKI Jakarta",
  "Jakarta Pusat, DKI Jakarta",
  "Jakarta Selatan, DKI Jakarta",
  "Jakarta Timur, DKI Jakarta",
  "Ponorogo, Jawa Timur",
  "Purwakarat, Jawa Barat",
  "Semarang, Jawa Tengah",
  "Serang, Banten",
  "Solo, Jawa Tengah",
  "Sragen, Jawa Tengah",
  "Subang, Jawa Barat",
  "Surabaya, Jawa Timur",
  "Tanggerang, Banten",
  "Yogyakarta, DIY",
];

const CATEGORIES = [
  "Bahari",
  "Budaya",
  "Cagar Alam",
  "Pusat Perbelanjaan",
  "Taman Hiburan",
  "Tempat Ibadah",
];

const RecommendForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    location: LOCATIONS[0],
    age: "",
    budget: "",
    category_preference: CATEGORIES[0],
    lat: "",
    lng: "",
  });
  const [locStatus, setLocStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetLocation = () => {
    setLocStatus("Meminta izin lokasi...");
    if (!navigator.geolocation) {
      setLocStatus("Geolocation tidak didukung browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }));
        setLocStatus("Lokasi berhasil diambil!");
      },
      (err) => {
        setLocStatus("Gagal mendapatkan lokasi: " + err.message);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({
      ...form,
      age: Number(form.age),
      budget: Number(form.budget),
      lat: form.lat === "" ? undefined : Number(form.lat),
      lng: form.lng === "" ? undefined : Number(form.lng),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto flex flex-col gap-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-main mb-2">Dapatkan Rekomendasi Wisata</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="text-sm font-medium text-text mb-1">
          Lokasi
        </label>
        <select
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main text-sm"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      {/* Tombol lokasi */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-main text-white text-xs font-bold py-2 px-3 rounded-md hover:bg-secondary transition-colors"
          disabled={loading}
        >
          Gunakan Lokasi Saya
        </button>
        {form.lat && form.lng && (
          <span className="text-green-700 text-xs flex items-center gap-1">
            Lat: {form.lat.toString().slice(0,9)}, Lng: {form.lng.toString().slice(0,9)}
            <button
              type="button"
              onClick={() => {
                setForm((prev) => ({ ...prev, lat: "", lng: "" }));
                setLocStatus("");
              }}
              className="ml-1 text-red-500 hover:text-red-700 text-base font-bold px-1"
              title="Hapus lokasi"
            >
              ×
            </button>
          </span>
        )}
        {locStatus && !(form.lat && form.lng) && (
          <span className="text-red-600 text-xs">{locStatus}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="age" className="text-sm font-medium text-text mb-1">
          Umur
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min="0"
          value={form.age}
          onChange={handleChange}
          placeholder="Masukkan umur"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main text-sm"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="budget" className="text-sm font-medium text-text mb-1">
          Budget (Rp)
        </label>
        <input
          id="budget"
          name="budget"
          type="number"
          min="0"
          value={form.budget}
          onChange={handleChange}
          placeholder="Masukkan budget (0 untuk gratis)"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main text-sm"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category_preference" className="text-sm font-medium text-text mb-1">
          Kategori
        </label>
        <select
          id="category_preference"
          name="category_preference"
          value={form.category_preference}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-main text-sm"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-main text-white text-xs font-bold py-3 px-4 rounded-md hover:bg-secondary transition-colors disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Dapatkan Rekomendasi"}
      </button>
    </form>
  );
};

export default RecommendForm;

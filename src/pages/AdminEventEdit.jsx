import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AdminEventEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append('category', category);
    formData.append('picture', selectedImage);

    try {
      const res = await fetch('http://localhost:3000/admin/api/v1/events/create', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex justify-between items-center border-b px-10 py-4">
        <h1 className="text-xl font-bold text-blue-900">UrbanRayaJakarta</h1>
      </header>

      {/* Profile Header */}
      <div className="w-full bg-green-700 text-white px-10 py-6 flex items-center gap-4">
        <div className="bg-white text-green-700 rounded-full w-14 h-14 flex items-center justify-center text-3xl">
          👤
        </div>
        <h2 className="text-xl font-semibold">Taman Ismail Marzuki</h2>
      </div>

      {/* Title */}
      <h2 className="mt-10 text-2xl font-bold text-blue-900">Create New Event</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md mt-6 p-6 rounded-lg shadow border"
        encType="multipart/form-data"
      >
        {/* Name */}
        <label className="block text-sm font-medium text-gray-700">Name Event</label>
        <input {...register('name')} className="form-input w-full mb-4 mt-1 border rounded px-3 py-2" />

        {/* Location */}
        <label className="block text-sm font-medium text-gray-700">Location Event</label>
        <input {...register('location')} className="form-input w-full mb-4 mt-1 border rounded px-3 py-2" />

        {/* Date & Time */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input {...register('date')} type="date" className="form-input w-full mb-4 mt-1 border rounded px-3 py-2" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input {...register('time')} type="text" className="form-input w-full mb-4 mt-1 border rounded px-3 py-2" />
          </div>
        </div>

        {/* Expired Date */}
        <label className="block text-sm font-medium text-gray-700">Expired Date</label>
        <input {...register('expiredDate')} type="date" className="form-input w-full mb-4 mt-1 border rounded px-3 py-2" />

        {/* Picture Upload */}
        <label className="block text-sm font-medium text-gray-700">Picture Event</label>
        <input
          type="file"
          accept="image/*"
          className="form-input w-full mb-4 mt-1"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />

        {/* Description */}
        <label className="block text-sm font-medium text-gray-700">Description Event</label>
        <textarea {...register('description')} rows={3} className="form-textarea w-full mb-4 mt-1 border rounded px-3 py-2" />

        {/* Price */}
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input {...register('price')} className="form-input w-full mb-4 mt-1 border rounded px-3 py-2" />

        {/* Category Radio */}
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Park</label>
        <div className="flex gap-4 mb-6">
          {['City Park', 'Amusement Park', 'Education Park'].map((val) => (
            <label key={val} className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value={val}
                checked={category === val}
                onChange={() => setCategory(val)}
                className="form-radio text-green-600"
              />
              <span className="ml-2 text-sm">{val}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button type="button" className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => navigate("../")}>Batal</button>
          <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">Create Event</button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-10 bg-green-700 text-white text-center w-full py-4">
        Copyright © Ekswara 2025. All Rights Reserved.
      </footer>
    </div>
  );
}

export default AdminEventEdit;

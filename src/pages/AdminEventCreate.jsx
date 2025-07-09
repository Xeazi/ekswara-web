import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function AdminEventCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();    

  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const { destinationId } = useParams();

  const username = localStorage.getItem("username");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append("category", category);
    formData.append("image", selectedImage);
    formData.append("status", status);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:3000/admin/api/v1/destinations/${destinationId}/events/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert('Event successfully created!');

      navigate(-1)

    } catch (error) {
      console.error(error);
      if (error?.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      <header className="w-full flex justify-between items-center border-b px-10 py-4">
        <h1 className="text-xl font-bold text-blue-900">UrbanRayaJakarta</h1>
      </header>

      <div className="w-full bg-green-700 text-white px-10 py-6 flex items-center gap-4">
        <div className="bg-white text-green-700 rounded-full w-14 h-14 flex items-center justify-center text-3xl">
          👤
        </div>
        <h2 className="text-xl font-semibold">{username}</h2>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-blue-900">
        Create New Event
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md mt-6 p-6 rounded-lg shadow border"
        encType="multipart/form-data"
      >
        <label className="block text-sm font-medium text-gray-700">
          Name Event
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          className="form-input w-full mb-1 mt-1 border rounded px-3 py-2"
          placeholder={username + "'s Event"}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
        )}

        {/* <label className="block text-sm font-medium text-gray-700">
          Location Event
        </label>
        <input
          {...register("location", { required: "Location is required" })}
          className="form-input w-full mb-1 mt-1 border rounded px-3 py-2"
          placeholder="Central Jakarta"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mb-2">{errors.location.message}</p>
        )} */}

        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              {...register("date", { required: "Date is required" })}
              type="date"
              className="form-input w-full mb-1 mt-1 border rounded px-3 py-2"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mb-2">{errors.date.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              {...register("time", {
                required: "Time is required",
                pattern: {
                  value: /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/,
                  message: "Format must be HH:MM-HH:MM",
                },
              })}
              type="text"
              className="form-input w-full mb-1 mt-1 border rounded px-3 py-2"
              placeholder="00:00-00:00"
            />
            {errors.time && (
              <p className="text-red-500 text-sm mb-2">{errors.time.message}</p>
            )}
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-700">
          Expired Date
        </label>
        <input
          {...register("expiredDate", { required: "Expired date is required" })}
          type="date"
          className="form-input w-full mb-1 mt-1 border rounded px-3 py-2"
        />
        {errors.expiredDate && (
          <p className="text-red-500 text-sm mb-2">
            {errors.expiredDate.message}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Picture Event
        </label>
        <input required
          type="file"
          name="image"
          accept="image/*"
          className="form-input w-full mb-1 mt-1"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        {!selectedImage && (
          <p className="text-red-500 text-sm mb-2">Image is required</p>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Description Event
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={3}
          className="form-textarea w-full mb-1 mt-1 border rounded px-3 py-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mb-2">
            {errors.description.message}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          {...register("price", {
            required: "Price is required",
            max: {
              value: 99999999,
              message: "Maximum price is 8 digits",
            },
          })}
          type="number"
          className="form-input w-full mb-1 mt-1 border rounded px-3 py-2"
          placeholder="(Rupiah)"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mb-2">{errors.price.message}</p>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Park
        </label>
        <div className="flex gap-4 mb-6">
          {["City Park", "Amusement Park", "Education Park"].map((val) => (
            <label key={val} className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value={val}
                checked={category === val}
                onChange={() => setCategory(val)}
                className="form-radio text-green-600"
                required
              />
              <span className="ml-2 text-sm">{val}</span>
            </label>
          ))}
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Status
        </label>
        <div className="flex gap-4 mb-6">
          {["held", "postponed"].map((val) => (
            <label key={val} className="inline-flex items-center">
              <input
                type="radio"
                name="status"
                value={val}
                checked={status === val}
                onChange={() => setStatus(val)}
                className="form-radio text-green-600"
                required
              />
              <span className="ml-2 text-sm">{val}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-red-500 rounded hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Create Event
          </button>
        </div>
      </form>

      <footer className="mt-10 bg-green-700 text-white text-center w-full py-4">
        Copyright © Ekswara 2025. All Rights Reserved.
      </footer>
    </div>
  );
}

export default AdminEventCreate;

import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/Button";
import { FeatureCard } from "../components/featureCard";
import { RecommendComponent } from "../components/recommendComponent";
import { GalleryWisata } from "../components/GalleryWisata";
import heroPark from "../assets/image/Home/heroPark.jpg";
import UpcomingCard from "../components/UpcomingCard";
import ismailImg from "../assets/image/taman ismail/download (1).jpg";
import jskyImg from "../assets/image/playground-J-Sky-Ferris-Wheel.webp";
import cibugaryImg from "../assets/image/cibugary/This Johor Farm Has Animal Feeding, Sky Lanterns & $46_Night Chalets, Lift Any Baaad Mood.jpg";
import marzukiLagiImg from "../assets/image/taman ismail/ROKEN.jpg";
import tamanImage from "../assets/image/taman-ismail-marzuki/Perpustakaan-Taman-Ismail-Marzuki-Cikini.jpg";
import jskyImage from "../assets/image/j-sky/IMG_0643.jpeg";
import cibugaryImage from "../assets/image/cibugary/CibugaryFarmWisataEdukasiCibugary.jpg";
import tamanTerbaik from "../assets/image/taman ismail/Taman Ismail Marzuki, Cikini.jpg"
import { Link } from "react-router-dom";


function Homepage() {
  const events = [
    {
      date: "8 Mei",
      image: ismailImg,
      location: "Taman Ismail Marzuki Jakarta",
      title: "Pameran dan Workshop Seniman Lokal",
      time: "10:00 – 16:00",
      price: "Rp.68,000",
    },
    {
      date: "10 Mei",
      image: jskyImg,
      location: "J-Sky FerrisWheel, Jakarta",
      title: "Misi Rahasia di Atas Awan",
      time: "16:00 – 20:00",
      price: "Rp.115,000",
    },
    {
      date: "18 Mei",
      image: cibugaryImg,
      location: "Agro Cibugary, Jakarta",
      title: "Dairyland Explorers - Menjelajahi Peternakan",
      time: "08:00 – 12:00",
      price: "Rp.100,000",
    },
    {
      date: "26 Mei",
      image: marzukiLagiImg,
      location: "Taman Ismail Marzuki Jakarta",
      title: "Pertunjukan dan Workshop Tari Tradisional",
      time: "16:00 – 22:00",
      price: "Rp.50,000",
    },
  ];

  const recommendedPlaces = [
  {
    id: 1,
    name: "Taman Ismail Marzuki",
    image: tamanImage,
  },
  {
    id: 2,
    name: "J-Sky Ferris Wheel",
    image: jskyImage,
  },
  {
    id: 3,
    name: "Cibugary Farm",
    image: cibugaryImage,
  },
];

const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full">
      <Header />
      <section className="container mx-auto relative w-full h-[500px] my-12 max-w-6xl">
        <img
          src={heroPark}
          alt="Jakarta Park"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover the Green Face
            <br />
            of Jakarta
          </h1>
          <p className="text-sm md:text-base mb-6">
            Explore the best city parks, amusement parks and green spaces!
          </p>
          <Button text="Explore Now" />
        </div>
      </section>
      <section className="container mx-auto my-12 max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-8">
          Why Choose UrbanRayaJakarta
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="ticket"
            title="Ultimate Flexibility"
            description="You're in control—freely adjust your plans to fit your lifestyle"
          />
          <FeatureCard
            icon="experience"
            title="Memorable Experiences"
            description="Browse and book events and activities so incredible, you'll want to tell your friends."
          />
          <FeatureCard
            icon="quality"
            title="Quality at our core"
            description="High-quality standards. Millions of reviews. "
          />
        </div>
      </section>
      <section className="container mx-auto my-12  w-full max-w-6xl px-4">
        <h2 className="text-2xl font-bold mb-6">Recommended Places</h2>
        <RecommendComponent places={recommendedPlaces} />
      </section>
      <section className="container bg-secondary p-6 items-center mx-auto my-12 max-w-6xl rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upcoming Event</h2>
          <a href="/events" className="text-sm text-text hover:underline">
            See all
          </a>
        </div>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {sortedEvents.map((event, id) => (
            <UpcomingCard key={id} {...event} />
          ))}
        </div>
      </section>
      <section className="mx-auto my-12 max-w-6xl h-[600px] mb-50">
        <div className="bg-secondary  rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          <div className="flex flex-col justify-center px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 leading-tight">
              Dapatkan Rekomendasi<br />Taman Terbaik
            </h2>
            <p className="text-sm text-text mb-6">Temukan Tempat Hiburan</p>
            <Link
              href="#recommended"
              className="bg-main hover:bg-secondary text-white px-6 py-3 rounded-md w-fit">
              Temukan disini
            </Link>
          </div>
          <div className="w-full h-[300px] md:h-auto">
            <img
              src={tamanTerbaik}
              alt="Taman Ismail Marzuki"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section>
          <GalleryWisata />
      </section>
      <Footer />
    </div>
  );
}

export default Homepage;

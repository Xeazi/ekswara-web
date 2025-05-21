import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/button";
import { FeatureCard } from "../components/featureCard";
import { RecommendComponent } from "../components/recommendComponent";
import heroPark from "../assets/image/Home/heroPark.jpg";

function Homepage() {
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
      <section className="container mx-auto my-12 max-w-6xl px-4">
      <h2 className="text-2xl font-bold mb-6">Recommended Places</h2>
        <RecommendComponent/>
      </section>

      <Footer />
    </div>
  );
}

export default Homepage;

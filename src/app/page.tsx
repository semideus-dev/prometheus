import { Hero } from "@/components/landing/hero";
import Navbar from "@/components/navbar";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
}

import Navbar from "@/components/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="pt-36">{children}</div>
    </main>
  );
}

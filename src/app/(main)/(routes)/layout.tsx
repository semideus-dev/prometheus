import Navbar from "@/components/navbar";
import React from "react";

export default function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <div className="pt-36">{children}</div>
    </section>
  );
}

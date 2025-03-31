import React from "react";

export default function FeedbackTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl font-medium border-primary border-l border-b p-4">{title}</h1>
  );
}

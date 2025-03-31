import React from "react";

export default function FeedbackPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-full px-4 flex items-center gap-2 py-1 bg-muted">
      {children}
    </div>
  );
}

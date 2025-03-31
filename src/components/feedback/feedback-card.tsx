import { cn } from "@/lib/utils";
import React from "react";
import { Progress } from "../ui/progress";

interface Props {
  title: string;
  children: React.ReactNode;
  progress?: number;
  className?: string;
}

export default function FeedbackCard({
  title,
  children,
  progress,
  className,
}: Props) {
  return (
    <div
      className={cn(
        className,
        "bg-background border rounded-xl p-4 flex flex-col gap-4"
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">{title}</h1>
        {progress && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                progress < 35 && "text-destructive",
                progress < 85 && progress >= 35 && "text-warning",
                progress >= 85 && "text-success",
                "text-2xl font-bold"
              )}
            >
              {progress}
            </span>
            <span className="text-muted-foreground">/100</span>
          </div>
        )}
      </div>
      {progress && <Progress value={progress} />}
      <br />
      {children}
    </div>
  );
}

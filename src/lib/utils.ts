import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  isoString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  if (!isoString) return "";

  try {
    const date = new Date(isoString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

export function formatTechnologies(techArray: string[]): string[] {
  return techArray.flatMap((tech) =>
    tech.includes(" and ") ? tech.split(" and ") : tech.split(", ")
  );
}
export function formatInterviewType(input: string): string {
  const lowerInput = input.toLowerCase();
  const hasMixed = lowerInput.includes("mixed");
  const hasTechnical = lowerInput.includes("technical");
  const hasBehavioral = lowerInput.includes("behavioral");

  if (hasMixed || (hasTechnical && hasBehavioral)) {
    return "mixed";
  } else if (hasTechnical) {
    return "technical";
  } else if (hasBehavioral) {
    return "behavioral";
  } else {
    return "mixed";
  }
}

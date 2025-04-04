import Link from "next/link";
import { FaCalendar, FaStar } from "react-icons/fa";

import {
  formatDate,
  formatInterviewType,
  formatTechnologies,
} from "@/lib/utils";
import { getFeedbackbyInterviewId } from "@/lib/actions/interview.actions";

export default async function InterviewCard({
  id,
  userId,
  type,
  techstack,
  role,
  createdAt,
}: InterviewCardProps) {
  const feedback =
    id && userId
      ? await getFeedbackbyInterviewId({ interviewId: id, userId })
      : null;

  const formattedTechstack = formatTechnologies(techstack);
  const formattedType = formatInterviewType(type);
  return (
    <Link href={`/interview/${id}`}>
      <div className="border rounded-xl relative flex flex-col justify-between h-full">
        <div className="bg-primary w-fit text-primary-foreground px-4 absolute right-0 uppercase rounded-tr-xl rounded-bl-xl">
          {formattedType}
        </div>
        <div className="p-4 flex flex-col gap-6">
          <h1 className="text-3xl font-medium my-2 capitalize">{role} Interview</h1>
          <p className="text-justify text-muted-foreground font-medium">
            Technologies covered in this interview are: <br />{" "}
            {formattedTechstack.map((tech, index) => (
              <span key={index}>
                <code key={index} className="px-2 bg-muted rounded-full">
                  {tech}
                </code>
                {index !== formattedTechstack.length - 1 && " "}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center justify-between p-4 text-muted-foreground text-sm font-light">
          <div className="flex items-center gap-2">
            <FaCalendar />
            <span>{formatDate(createdAt)}</span>
          </div>
          {feedback && (
            <div className="flex items-center gap-2">
              <FaStar />
              <span>{feedback.totalScore} / 100</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

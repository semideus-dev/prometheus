import { getFeedbackbyInterviewId } from "@/lib/actions/interview.actions";
import Link from "next/link";
import { FaCalendar, FaStar } from "react-icons/fa";

interface Props {
  id: string;
  userId: string;
  type: string;
  techstack: string[];
  role: string;
  createdAt: string;
}

export default async function InterviewCard({
  id,
  userId,
  type,
  techstack,
  role,
  createdAt,
}: Props) {
  const feedback =
    id && userId
      ? await getFeedbackbyInterviewId({ interviewId: id, userId })
      : null;
  return (
    <Link href={`/interview/${id}`}>
      <div className="border rounded-xl relative flex flex-col">
        <div className="bg-primary w-fit px-4 absolute right-0 rounded-tr-xl rounded-bl-xl">
          {type}
        </div>
        <div className="p-4 flex flex-col gap-6">
          <h1 className="text-3xl font-medium">{role} Interview</h1>
          <p className="text-justify text-muted-foreground font-medium">
            Technologies covered in this interview are: <br />{" "}
            {techstack.join(", ")}
          </p>
          <div className="flex items-center justify-between text-muted-foreground text-sm font-light">
            <div className="flex items-center gap-2">
              <FaCalendar />
              <span>{createdAt}</span>
            </div>
            {feedback && (
              <div className="flex items-center gap-2">
                <FaStar />
                <span>{feedback.totalScore} / 100</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

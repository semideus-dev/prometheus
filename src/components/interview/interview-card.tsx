import Link from "next/link";
import { FaCalendar, FaStar } from "react-icons/fa";

interface Props {
  id: string;
  type: string;
  techstack: string[];
  role: string;
  createdAt: string;
}

export default function InterviewCard({
  id,
  type,
  techstack,
  role,
  createdAt,
}: Props) {
  return (
    <Link href={`/interview/${id}`}>
      <div className="border rounded-xl relative flex flex-col">
        <div className="bg-primary w-fit px-4 absolute right-0 rounded-tr-xl rounded-bl-xl">
          Mixed
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
            <div className="flex items-center gap-2">
              <FaStar />
              <span>67/100</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

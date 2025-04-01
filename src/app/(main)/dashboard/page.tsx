import Link from "next/link";
import ProfileCard from "@/components/dashboard/profile-card";
import InterviewCard from "@/components/interview/interview-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosAddCircle, IoMdSearch } from "react-icons/io";
import { getInterviewByUserId } from "@/lib/actions/interview.actions";
import { getCurrentUser } from "@/lib/actions/auth.actions";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-medium text-muted-foreground">
        <p>Please sign in to view your interviews.</p>
      </div>
    )
  }
  const interviews = await getInterviewByUserId(user.id);

  return (
    <div className="px-10">
      <ProfileCard />
      <div className="my-4 flex items-center gap-2">
        <Link href="/interview/create">
          <Button variant="outline">
            <IoIosAddCircle size={20} />
            Create Interview
          </Button>
        </Link>
        <div className="relative w-full">
          <Input className="peer ps-9" placeholder="Search" />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <IoMdSearch size={16} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {interviews?.length &&
          interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              id={interview.id}
              userId={user.id}
              type={interview.type}
              techstack={interview.techstack}
              role={interview.role}
              createdAt={interview.createdAt}
            />
          ))}
      </div>
    </div>
  );
}

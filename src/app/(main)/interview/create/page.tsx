import Agent from "@/components/interview/agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";

export default async function InterviewPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <section className="pt-24 px-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-medium">Interview Generation</h1>
        <p className="text-muted-foreground/80 pt-4">
          You need to be logged in to use this feature
        </p>
      </section>
    );
  }
  return (
    <section className="pt-24 px-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-medium">Interview Generation</h1>
      <Agent user={user} type="generate" />
    </section>
  );
}

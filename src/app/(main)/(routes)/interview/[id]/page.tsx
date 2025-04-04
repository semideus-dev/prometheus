import Agent from "@/components/interview/agent";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import { getInterviewById } from "@/lib/actions/interview.actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function InterviewSession({ params }: RouteParams) {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getCurrentUser()

  if (!interview) redirect("/");

  return <section className="px-10 flex flex-col items-center justify-center gap-6">
    <h1 className="text-3xl font-medium capitalize">{interview.role} Interview</h1>
    <span className="bg-primary px-4 rounded-md w-fit uppercase">{interview.type}</span>
    <Agent user={user!} type="interview" questions={interview.questions} interviewId={id} />
  </section>;
}

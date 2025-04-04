import FeedbackCard from "@/components/feedback/feedback-card";
import FeedbackPill from "@/components/feedback/feedback-pill";
import FeedbackTitle from "@/components/feedback/feedback-title";
import { getCurrentUser } from "@/lib/actions/auth.actions";
import {
  getFeedbackbyInterviewId,
  getInterviewById,
} from "@/lib/actions/interview.actions";
import { formatDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";
import { FaCalendar } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { FaUser } from "react-icons/fa6";

export default async function FeedbackPage({ params }: RouteParams) {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect("/dashboard");

  const feedback = await getFeedbackbyInterviewId({
    interviewId: id,
    userId: user!.id,
  });

  return (
    <section className="px-10 flex flex-col gap-6 items-center justify-center">
      <h1 className="font-medium text-3xl">
        Feedback on - {interview.role} Interview
      </h1>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-2">
          {/* Overall Impression */}
          <FeedbackPill>
            <FaUser className="text-primary" />
            <p>{user!.username}</p>
          </FeedbackPill>

          {/* Date */}
          <FeedbackPill>
            <FaCalendar className="text-primary" />
            <p>{formatDate(feedback!.createdAt)}</p>
          </FeedbackPill>
        </div>
      </div>

      <FeedbackCard title="Overall Impression" progress={feedback?.totalScore}>
        <p className="text-justify">{feedback?.finalAssessment}</p>
      </FeedbackCard>

      {/* <p className="text-justify">{feedback?.finalAssessment}</p> */}

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4 text-justify w-full">
        <FeedbackTitle title="Interview Breakdown" />
        {feedback?.categoryScores?.map((category, index) => (
          <FeedbackCard
            key={index}
            title={category.name}
            progress={category.score}
          >
            <p className="text-justify">{category.comment}</p>
          </FeedbackCard>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full">
        <FeedbackTitle title="Strengths" />
        {feedback?.strengths?.length ? (
          <ul className="leading-relaxed my-1 text-justify">
            {feedback?.strengths?.map((strength, index) => (
              <li key={index} className="flex items-center gap-2 my-1">
                <TiTickOutline className="text-success" />
                {strength}
              </li>
            ))}
          </ul>
        ) : (
          <p>No definite strengths found.</p>
        )}
      </div>

      <div className="flex flex-col gap-4 w-full">
        <FeedbackTitle title="Areas for Improvement" />
        <ul className="leading-relaxed my-1 text-justify">
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index} className="flex items-center gap-2 my-1">
              <MdOutlineErrorOutline className="text-destructive text-lg" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

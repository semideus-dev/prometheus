"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { vapi } from "@/lib/vapi.sdk";

import { bottts } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { cn } from "@/lib/utils";
import { interviewer } from "@/lib/constants";
import { createFeedback } from "@/lib/actions/interview.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function Agent({
  user,
  type,
  questions,
  interviewId,
}: {
  user: User;
  type: "generate" | "interview";
  questions?: string[];
  interviewId?: string;
}) {
  const avatar = createAvatar(bottts, {
    seed: Math.random().toString(),
  });

  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    const onSpeachStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (e: Error) => console.log(e);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeachStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeachStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: ChatMessage[]) => {
    const { success, id } = await createFeedback({
      interviewId: interviewId!,
      userId: user.id!,
      transcript: messages,
    });

    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.error("Error generating feedback");
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/dashboard");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, user.id]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
        variableValues: {
          username: user.username,
          userId: user.id,
        },
      });
    } else {
      let formattedQuestions = "";

      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: { questions: formattedQuestions },
      });
    }
  };
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactive =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.CONNECTING;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px] gap-4 my-5 w-full">
        <div className="border-2 bg-primary/10 rounded-xl p-4 flex flex-col gap-4 items-center justify-center">
          <div
            className="h-36 w-36 rounded-xl overflow-hidden"
            dangerouslySetInnerHTML={{ __html: avatar.toString() }}
          />

          <span className="text-xl font-medium">Prometheus</span>
        </div>
        <div className="border-2 bg-background rounded-xl p-4 flex flex-col gap-4 items-center justify-center">
          <div
            className="h-36 w-36 overflow-hidden rounded-xl"
            dangerouslySetInnerHTML={{ __html: user.avatar.toString() }}
          />
          <span className="text-xl font-medium">You</span>
        </div>
      </div>
      {messages.length > 0 && (
        <div
          key={latestMessage}
          className="border rounded-xl p-4 w-[60%] text-center mb-5"
        >
          {latestMessage}
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button
            className="relative text-lg rounded-full cursor-pointer px-10 flex gap-4 items-center py-3 bg-emerald-500"
            onClick={() => handleCall()}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {isCallInactive ? "Call" : ". . ."}
            </span>
          </button>
        ) : (
          <button
            className="bg-rose-500 text-lg rounded-full cursor-pointer px-10 flex gap-4 items-center py-3 hover:bg-rose-600"
            onClick={() => handleDisconnect()}
          >
            End
          </button>
        )}
      </div>
    </>
  );
}

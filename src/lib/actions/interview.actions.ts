"use server";

import { db } from "@/firebase/admin";

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
}

export async function getInterviewById(
  id: string
): Promise<Interview | null> {
  const interview = await db
    .collection("interviews")
    .doc(id)
    .get();

  return interview.data() as Interview | null;
}

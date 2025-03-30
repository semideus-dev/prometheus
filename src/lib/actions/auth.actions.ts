"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";

const TWO_DAYS = 60 * 60 * 24 * 2;

export async function signUp(params: SignUpProps) {
  const { uid, username, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists.",
      };
    }

    const avatar = createAvatar(funEmoji, {
      seed: Math.random().toString(),
    });

    await db.collection("users").doc(uid).set({
      username,
      email,
      avatar: avatar.toString(),
    });

    return {
      success: true,
      message: "User signed up successfully.",
    };
  } catch (error: any) {
    console.error("Error signing up:", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email is already in use.",
      };
    }

    return {
      success: false,
      message: "An error occurred while signing up.",
    };
  }
}

export async function signIn(params: SignInProps) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Create an account instead",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "User signed in successfully.",
    };
  } catch (error: any) {
    console.error("Error signing in:", error);
    return {
      success: false,
      message: "An error occurred while signing in.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: TWO_DAYS * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: TWO_DAYS,
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error: any) {
    // console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

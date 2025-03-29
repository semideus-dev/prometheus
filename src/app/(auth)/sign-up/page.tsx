import SignUpForm from "@/components/auth/sign-up-form";
import React from "react";

export default function SignInPage() {
  return (
    <div className="border p-4 rounded-lg w-[60%] bg-background text-center">
      <h1 className="text-4xl font-medium">Sign Up</h1>
      <p className="text-muted-foreground text-sm my-4">
        Create an account to get started.
      </p>
      <SignUpForm />
    </div>
  );
}

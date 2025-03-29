import SignInForm from "@/components/auth/sign-in-form";
import React from "react";

export default function SignInPage() {
  return (
    <div className="border p-4 rounded-lg w-[60%] bg-background text-center">
      <h1 className="text-4xl font-medium">Sign In</h1>
      <p className="text-muted-foreground text-sm my-4">Enter your credentials to proceed.</p>
      <SignInForm />
    </div>
  );
}

"use client";

import { motion } from "motion/react";

import SignUpForm from "@/components/auth/sign-up-form";

export default function SignInPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border p-4 rounded-lg w-[60%] bg-background text-center"
    >
      <h1 className="text-4xl font-medium">Sign Up</h1>
      <p className="text-muted-foreground text-sm my-4">
        Create an account to get started.
      </p>
      <SignUpForm />
    </motion.div>
  );
}

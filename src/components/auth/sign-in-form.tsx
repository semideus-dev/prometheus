"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/client";
import { signIn } from "@/lib/actions/auth.actions";
import { signInWithEmailAndPassword } from "firebase/auth";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PiSpinner } from "react-icons/pi";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCredentials.user.getIdToken();

      const result = await signIn({
        email,
        idToken,
      });

      if (!result.success) {
        toast(result.message);
        return;
      }

      toast.success("User signed in successfully.");
      router.push("/");
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error("Error signing in.");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  {/* <Link href="/forgot-password" className="text-sm">
                    Forgot password?
                  </Link> */}
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <PiSpinner className="animate-spin" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-white hover:underline underline-offset-4 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

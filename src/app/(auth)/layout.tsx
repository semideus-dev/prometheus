import { isAuthenticated } from "@/lib/actions/auth.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <section className="hidden flex-col items-center bg-primary text-primary-foreground justify-between p-10 lg:flex">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.svg"
              width={50}
              height={50}
              alt="Logo"
            />

            <h1 className="text-3xl font-light uppercase">Prometheus</h1>
          </div>
          <div className="mt-10 space-y-5 text-center">
            <h1 className="text-3xl font-medium">Get Hired Faster!</h1>
            <p className="text-sm">
              Get real-time AI-driven mock interviews tailored to your role and
              experience.
              <br />
              Practice, receive feedback, and boost your confidence—all in one
              platform!
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center self-start gap-2 uppercase text-lg tracking-tight"
        >
          <FaAngleLeft />
          <span>home</span>
        </Link>
      </section>
      <section className="flex flex-1 flex-col items-center p-4 py-10 lg:justify-center lg:p-10">
        {children}
      </section>
    </main>
  );
}

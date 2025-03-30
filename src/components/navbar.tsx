import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";

export default async function Navbar() {
  const isUserAuthenticated = await isAuthenticated();
  return (
    <nav className="z-50 fixed flex items-center justify-between w-full p-10">
      <Link href="/">
        <div className="flex items-center gap-4">
          <Image src="/logo.svg" width={20} height={20} alt="Logo" />
          <h1 className="text-xl font-light">Prometheus</h1>
        </div>
      </Link>
      {/* <div className="p-4 px-10 rounded-full border flex items-center gap-6 bg-background">
        <Link href="#">Explore</Link>
        <Link href="#">Interviews</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">Contact</Link>
      </div> */}
      <div className="flex items-center gap-4">
        {isUserAuthenticated ? (
          <Link href="/dashboard">
            <Button variant="outline">
              Dashboard <AiOutlineDashboard />
            </Button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">
              Get Started <IoMdLogIn />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

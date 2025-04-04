import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <h1 className="font-medium text-3xl">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%]">
        <div className="h-full flex flex-col items-start border p-4 rounded-xl justify-between gap-4">
          <div>
            <h1 className="font-medium text-lg">Free Tier</h1>
            <p className="text-primary text-4xl">
              $0{" "}
              <span className="text-xl text-muted-foreground"> / forever</span>{" "}
            </p>
            <ul className="flex flex-col my-4 gap-4">
              <li className="flex items-center gap-2">
                <FaCheck className="text-success" />
                <span>Access to Interview creation*</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-success" />
                <span>Ability to retake Interviews*</span>
              </li>
            </ul>
          </div>
          <Button className="w-full" variant="outline">
            Sign In
          </Button>
        </div>
        <div className="h-full flex flex-col items-start border border-primary p-4 rounded-xl justify-between gap-4">
          <div>
            <h1 className="font-medium text-lg">Pro Tier</h1>
            <p className="text-primary text-4xl">
              $9.99{" "}
              <span className="text-xl text-muted-foreground"> / month</span>{" "}
            </p>
            <ul className="flex flex-col my-4 gap-4">
              <li className="flex items-center gap-2">
                <FaCheck className="text-success" />
                <span>Create unlimited Interview</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-success" />
                <span>Unlimited retakes</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-success" />
                <span>Access to community-created interviews</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="text-success" />
                <span>Detailed feedback with Strengths & Improvements</span>
              </li>
            </ul>
          </div>
          <Button className="w-full">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

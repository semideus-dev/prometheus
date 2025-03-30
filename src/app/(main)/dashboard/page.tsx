import ProfileCard from "@/components/dashboard/profile-card";
import { Button } from "@/components/ui/button";
import { IoIosAddCircle, IoMdSearch } from "react-icons/io";
import React from "react";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <div className="pt-24 px-10">
      <ProfileCard />
      <div className="my-4 flex items-center gap-2">
        <Button variant="outline">
          <IoIosAddCircle size={20} />
          Create Interview
        </Button>
        <div className="relative w-full">
          <Input className="peer ps-9" placeholder="Search" />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <IoMdSearch size={16} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

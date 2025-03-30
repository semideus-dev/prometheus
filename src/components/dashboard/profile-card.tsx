import { getCurrentUser } from "@/lib/actions/auth.actions";
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfileCard() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }
  return (
    <div className="border p-8 rounded-xl flex justify-between items-center bg-gradient-to-tl from-transparent via-background to-primary/50">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-medium">Welcome, {user.username}!</h1>
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">Settings</Button>
          <Button variant="outline">Upgrade</Button>
        </div>
      </div>
      {user.avatar ? (
        <div
          className="h-24 w-24 rounded-xl overflow-hidden"
          dangerouslySetInnerHTML={{ __html: user.avatar }}
        />
      ) : (
        <Avatar className="h-24 w-24 text-5xl">
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

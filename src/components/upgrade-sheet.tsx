"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"

interface UpgradeSheetProps {
  children: React.ReactNode;
}

export function UpgradeSheet({ children }: UpgradeSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upgrade your account</SheetTitle>
          <SheetDescription>
            Unlock premium features with our pro plan.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Pro Plan Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Advanced analytics</li>
              <li>Priority support</li>
              <li>Increased storage</li>
              <li>Custom domains</li>
            </ul>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              Upgrade Now
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
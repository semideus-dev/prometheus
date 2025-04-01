import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getCurrentUser } from "@/lib/actions/auth.actions"
// import { Settings } from "firebase-admin/firestore"

interface SettingsSheetProps {
  children: React.ReactNode;
}

export async function SettingsSheet({ children }: SettingsSheetProps) {
  const user = await getCurrentUser()
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-medium text-muted-foreground">
        <p>Please sign in to view your settings.</p>
      </div>
    )
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value= {user.username} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input id="username" value= {user.email} className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <span className="flex gap-1.5 ">
              <Button type="submit" >Edit settings</Button>
              <Button type="submit" >Save changes</Button>
            </span>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

'use client'
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


import { MainNav } from "@/components/main-nav";
import prismadb from "@/lib/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {

  const session = useSession()
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {session && (
            <HoverCard>
              <HoverCardTrigger>        <Avatar>
                <AvatarImage src={session?.data?.user?.image as string} />
                <AvatarFallback>{session.data?.user?.name}</AvatarFallback>
              </Avatar></HoverCardTrigger>
              <HoverCardContent>
                <Button onClick={()=>{signOut()}}>Sign Out</Button>
                <h1>{session.data?.user?.name}</h1>
              </HoverCardContent>
            </HoverCard>

          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

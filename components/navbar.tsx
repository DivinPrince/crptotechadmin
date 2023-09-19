'use client'
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { MainNav } from "@/components/main-nav";
import prismadb from "@/lib/prismadb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {

  const session = useSession()
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        {session &&(
        <Avatar>
          <AvatarImage src={session?.data?.user?.image as string} />
          <AvatarFallback>Elyse</AvatarFallback>
        </Avatar>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
export default function Navbar() {
  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>{error.message}</div>;

  return (
    <>
      <nav className='flex mx-6'>
        <div className={cn("flex items-center space-x-4 lg:space-x-6 grow")}>
          <Link
            href='/home'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Home
          </Link>
          <Link
            href='/classroom/defar'
            className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
          >
            Classroom
          </Link>
        </div>

        {1 == 1 ? (
          <div className=''>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Avatar>
            <AvatarIcon className='w-6 h-6'></AvatarIcon>
          </Avatar>
        )}
      </nav>
    </>
  );
}

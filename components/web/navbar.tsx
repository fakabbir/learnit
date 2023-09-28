"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";

export default function Navbar() {
  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>{error.message}</div>;
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <>
      <nav className='flex mx-6'>
        <div className={cn("flex items-center space-x-4 lg:space-x-6 grow")}>
          <div className='logo'>
            <Link href='/'>
              <Image
                src='/assets/images/logo.png'
                width={(162 * 3) / 4}
                height={(67 * 3) / 4}
                quality={100}
                alt={"SkillZeit"}
              />
            </Link>
          </div>
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

        {session?.user?.name ? (
          <div className=''>
            <Avatar>
              <AvatarFallback>
                {session?.user?.name?.split(" ")[0][0].toUpperCase()}

                {(session?.user?.name?.split(" ").length > 1
                  ? session?.user?.name?.split(" ")[1][0]
                  : ""
                ).toUpperCase()}
              </AvatarFallback>
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

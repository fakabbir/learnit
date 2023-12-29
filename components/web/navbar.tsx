'use client'
 
import { usePathname } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
 

export default function Navbar() {
  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>{error.message}</div>;
  const { data: session, status } = useSession();
  const pathname = usePathname()

  console.log(session);
  console.log(status);

  return (
    <>
      <div className='grid grid-cols-4'>
        <div className='col-span-3'>

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

        </div>
        <div className=
        {pathname.includes("learn") ? "border-l col-span-1 flex items-center justify-between px-2":
        "col-span-1 flex items-center justify-between px-2"}>
          <div>
            {pathname.includes("learn") ?<Link
             href='/home'
             className='text-sm font-medium transition-colors hover:text-primary'
           >

             <Button>
            <HomeIcon className="mr-2 h-4 w-4" /> Home
          </Button>
           </Link>: null}

          
         

          {/* <Link
             href='/home'
             className='text-sm font-medium transition-colors hover:text-primary'
           >
             <HomeIcon width={22} height={22} color="green"/>
               </Link> */}


           </div>


         {session?.user?.name ? (

           <Avatar>
             <AvatarFallback>
               {session?.user?.name?.split(" ")[0][0].toUpperCase()}

               {(session?.user?.name?.split(" ").length > 1
                 ? session?.user?.name?.split(" ")[1][0]
                 : ""
               ).toUpperCase()}
             </AvatarFallback>
           </Avatar>

       ) : (
          
         null
       )}
          
        
        </div>
      </div>
    </>
  )

  // return (
  //   <>
  //         <div className="flex items-center space-x-2">
  //         <div className='logo'>
  //           <Link href='/'>
  //             <Image
  //               src='/assets/images/logo.png'
  //               width={(162 * 3) / 4}
  //               height={(67 * 3) / 4}
  //               quality={100}
  //               alt={"SkillZeit"}
  //             />
  //           </Link>
  //         </div>
  //         <Link
  //           href='/home'
  //           className='text-sm font-medium transition-colors hover:text-primary'
  //         >
  //           <HomeIcon width={22} height={22} color="green"/>
  //             </Link>


  //         </div>


  //       {session?.user?.name ? (

  //         <Avatar>
  //           <AvatarFallback>
  //             {session?.user?.name?.split(" ")[0][0].toUpperCase()}

  //             {(session?.user?.name?.split(" ").length > 1
  //               ? session?.user?.name?.split(" ")[1][0]
  //               : ""
  //             ).toUpperCase()}
  //           </AvatarFallback>
  //         </Avatar>

  //     ) : (
  //       // <Avatar>
  //       //   <AvatarIcon className='w-6 h-6'></AvatarIcon>
  //       // </Avatar>
  //       null
  //     )}


  //   </>
  // );
}

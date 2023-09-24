"use client";
import Head from 'next/head'
import { redirect } from 'next/navigation'
import Script from 'next/script'
import { Input } from "@/components/ui/input"
import { BellIcon, HandIcon, RocketIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { useEffect } from 'react'
import { useGoogleOneTapLogin } from '@react-oauth/google';

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

export default function Main() {

    // redirect('/home')

    function onSignIn(googleUser: any) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    
  function handle(event:any){
    console.log(event)
  }



  useEffect(()=>{

  },[])
  
  


    // useEffect(()=>{

        


    //     // window.onGoogleLibraryLoad = () => {
    //     //     google.accounts.id.initialize({
    //     //       client_id:'355050548644-kmlqgmfag9543ia894ab4dja8ip6kvaj.apps.googleusercontent.com',
    //     //       cancel_on_tap_outside: false,
    //     //       callback: handle,
    //     //       prompt_parent_id: "root",
    //     //       //intermediate_iframe_close_callback : close_callback1
    //     //     });
    //     //     google.accounts.id.prompt((notification) => {
    //     //       if (notification.isNotDisplayed()) {
    //     //         console.log(notification.getNotDisplayedReason());
    //     //       } else if (notification.isSkippedMoment()) {
    //     //         console.log("Skipped")
    //     //         console.log(notification.getSkippedReason());
    //     //       } else if (notification.isDismissedMoment()) {
    //     //         console.log(notification.getDismissedReason());
    //     //       } else {
                
    //     //       }
    //     //     });
    //     //   }

    //     // window.onload = function () {
    //     //     google.accounts.id.initialize({
    //     //       client_id: "355050548644-kmlqgmfag9543ia894ab4dja8ip6kvaj.apps.googleusercontent.com",
    //     //       callback:handle
    //     //     });
    //     //     google.accounts.id.prompt();
    //     //   };
    // })


    return (
        <>
        
        {/* <div id="g_id_onload"
     data-client_id="355050548644-kmlqgmfag9543ia894ab4dja8ip6kvaj.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback={handle}
     data-auto_select="true"
     data-itp_support="true">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div> */}
{/* <div id="g_id_onload"
     data-client_id="355050548644-kmlqgmfag9543ia894ab4dja8ip6kvaj.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="redirect"
     data-login_uri="http://localhost:3000/"
     data-callback="http://localhost:3000/auth"
     data-auto_select="true"
     data-itp_support="true">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div> */}
            <div className=''>
                <div className='bg-gray-100  h-[40vh] relative'>
                    <div className='absolute bg-blue-100 w-[30%]  mt-10 mx-10 shadow-md pb-4'>
                        <div className='m-4'>

                            <h1 className=' scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                                Learn at your own<br /> <span className='underline'>pace</span>
                            </h1>



                            <p className='leading-7 [&:not(:first-child)]:mt-6'>
                                Convert any playlist into your learning objective. <br />
                                Pick from where you have last watched.
                            </p>


                        </div>
                        <div className="mx-4 flex w-full max-w-sm items-center space-x-2">
                            <Input type="email" placeholder="Email" className='border-black' />
                            <Button>
                                <RocketIcon className="mr-2 h-4 w-4" /> Waitlist
                            </Button>
                        </div>


                    </div>
                </div>

                <div className='mx-8 my-2'>
                    {/* <Input type="text"  placeholder="Enter Playlist URL" /> */}

                    {/* <div className='flex'>
                        <div>
                            Left
                        </div>
                        <div>
                            Right
                        </div>
                    </div> */}
                </div>
                <div className='m-8 flex-col flex space-y-1'>
                    <p className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
                        Popular language courses
                    </p>
                    <Card className={cn("w-[380px]")}>
                        <CardHeader>
                            <CardTitle>Arabic A1 to C1</CardTitle>
                            <CardDescription>For beginners, based on V Rahims Books</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">

                        </CardContent>
                        <CardFooter>
                            <Link href="/path/arabica1toc1">
                                <Button className="w-full">

                                    <HandIcon className="mr-2 h-4 w-4" /> View Details
                                </Button>
                            </Link>

                        </CardFooter>
                    </Card>
                </div>
                <div className='mx-8 mb-16'>
                    <p className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
                        Frequently asked questions
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Do I need to pay?</AccordionTrigger>
                            <AccordionContent>
                                No, At the moment we are all running on low cost resources.
                                <br />
                                When we would upgrade our resources we would introduce
                                pricing, but the users already on the platform would not have to pay anything
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Where can I get help ?</AccordionTrigger>
                            <AccordionContent>
                                In case you are facing any difficulty, email us at help.resumeyt@gmail.com
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is the course downloadable?</AccordionTrigger>
                            <AccordionContent>
                                No, the whole course contents are not downloadable.
                                <br />
                                Only some resources like pdfs, images linked to the courses
                                could be downloaded.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            {/* <footer>
            <div className='py-10 mx-auto w-[30%]'>
                <p className='leading-7 [&:not(:first-child)]:mt-6'>© All Rights Reserved</p>
            </div>
        </footer> */}
        </>
    )


}
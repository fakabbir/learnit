"use client";
import Head from "next/head";
import Image from "next/image";
import { redirect } from "next/navigation";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { BellIcon, HandIcon, RocketIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import book1 from '../public/assets/images/book1.jpg';
import book2 from '../public/assets/images/book2.jpg';
import book3 from '../public/assets/images/book3.jpg';


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";

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
];

type CardProps = React.ComponentProps<typeof Card>;

export default function Main() {
  // redirect('/home')

  function onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  function handle(event: any) {
    console.log(event);
  }

  
  const [courseOverview, setCourseOverview] = useState<any>({
    list_of_courses: [],
  });


  useEffect(() => {
    // redirect("/home")

    fetch("https://timizli.onrender.com/" + `coursexl/arabic-a1-to-c1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the studentProgress state with the fetched data
        console.log(data);
        setCourseOverview(data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <>

<div className="w-10/12 mx-auto">
      <h2 className="scroll-m-20 pt-8 pb-8 text-3xl tracking-tight first:mt-0">
        Lecture Series
      </h2>

      <div className="flex space-x-8">
        {courseOverview.list_of_courses.map((item: any, idx:any) => (

          <>
          <Link
                  href={"/learn/" + item.course_id}
                  key={idx}
                >
          <Image src={item.course_id == "book-1" ? book1 : (item.course_id == "book-2" ? book2: (item.course_id == "book-3" ? book3: book1)) } alt="book"
                width={200} height={300}
                />
                </Link>
          </>

        ))}
      </div>

      <div className="mt-8">
      <a href="https://www.lqtoronto.com/downloads.html" target="#" className="text-blue-600 underline italic">Click to go to pdf download page(Books)</a>
      </div>


    </div>

    </>
  );
}

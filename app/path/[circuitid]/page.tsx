"use client";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { redirect } from "next/navigation";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { BellIcon, HandIcon, RocketIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

export default function Page({ params }: { params: { circuitid: string } }) {
  const { data: session } = useSession();

  const [courseOverview, setCourseOverview] = useState<any>({
    list_of_courses: [],
  });

  function registerForCourse() {
    if (session) {
      console.log(session);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_email: session.user?.email,
        coursexl_id: params.circuitid,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`https://timizli.onrender.com/user_courses`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Update the studentProgress state with the fetched data
          console.log(data);
          setEnrolledCourses(data.content);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      redirect("/api/auth/signin?callbackUrl=/path/" + params.circuitid);
    }
  }

  useEffect(() => {
    fetch("https://timizli.onrender.com/" + `coursexl/${params.circuitid}`)
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
      <div className='bg-gray-100  h-[40vh] relative'>
        <div className='p-4'>
          <h1 className=' scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            {courseOverview.course_name}
          </h1>
          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            New Leading Data
          </p>

          <Button
            className=''
            onClick={registerForCourse}
          >
            <HandIcon className='mr-2 h-4 w-4' /> Enroll Now
          </Button>
        </div>
      </div>

      <div className='path-details m-4'>
        <p className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          About
        </p>
        <p className='pb-8'>{courseOverview.course_description}</p>
        <p className='scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 '>
          Courses
        </p>
        <div className='flex flex-col space-y-3 w-1/2'>
          {courseOverview.list_of_courses.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.course_name}</CardTitle>
                <CardDescription>
                  For beginners, based on V Rahims Books
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'></CardContent>
              <CardFooter>
                <Link href={"/course/" + item.course_id}>
                  <Button className='w-full'>
                    <HandIcon className='mr-2 h-4 w-4' /> View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

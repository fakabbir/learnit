"use client";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { redirect } from "next/navigation";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { BellIcon, HandIcon, RocketIcon } from "@radix-ui/react-icons";

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
import { useEffect, useRef, useState } from "react";

interface StudentProgress {
  // Define your expected structure here
  course_content: {
    play_list_tile: string;
    // Add other properties if applicable
    list_of_obstacles: {
      obstacle_url: string;
    }[];
  }[];
  // Add other properties if applicable
}

export default function Page({ params }: { params: { courseid: string } }) {
  const [currentVideo, setCurrentVideo] = useState("");

  const [studentProgress, setStudentProgress] = useState<StudentProgress>();
  const apiUrl = "https://timizli.onrender.com/get_student_progress/f4amin";

  const [courseOverview, setCourseOverview] = useState<any>({
    sections: [],
  });

  // Function to get the played value

  useEffect(() => {
    fetch(`https://timizli.onrender.com/course/${params.courseid}`)
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
            Arabic A1 to C1
          </h1>
          <p className='leading-7 [&:not(:first-child)]:mt-6'>
            For beginners, based on V Rahims Books
          </p>

          <Link href='/path'>
            <Button className=''>
              <HandIcon className='mr-2 h-4 w-4' /> Enroll Now
            </Button>
          </Link>
        </div>
      </div>

      <div></div>
      <Card className='w-[95%] mx-auto mt-4'>
        <CardHeader>
          <CardTitle>What you will learn</CardTitle>
          <CardDescription>
            For beginners, based on V Rahims Books
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'></CardContent>
        <CardFooter>
          <Link href='/path'>
            <Button className='w-full'>
              <HandIcon className='mr-2 h-4 w-4' /> View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className='w-[95%] mx-auto mt-4'>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>
            For beginners, based on V Rahims Books
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
          >
            {courseOverview.sections ? (
              <>
                {courseOverview.sections.map((item: any, idxPlaylist: any) => (
                  <AccordionItem
                    key={idxPlaylist}
                    value={item.idxPlaylist}
                  >
                    <AccordionTrigger>{item.section_name}</AccordionTrigger>

                    <AccordionContent>
                      <p>htlo</p>
                      {/* {
                        item.videos.map((video, idx) => (
                          <p
                            key={idx}
                            className='cursor-pointer'
                          >
                            {video.video_name}
                          </p>
                        ))
                      } */}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </>
            ) : null}
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}

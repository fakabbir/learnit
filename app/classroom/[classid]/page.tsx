"use client";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

// Render a YouTube video player
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";

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
export default function Classroom({ params }: { params: { classid: string } }) {
  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    const handleSignIn = async () => {
      // const queryString = window.location.search;
      // const urlParams = new URLSearchParams(queryString);
      // alert(urlParams.get("callbackUrl"));
      const result = await signIn("google", {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirect: true,
        callbackUrl: "/classroom/" + params.classid,
      });
    };
    handleSignIn();
  }

  const [currentVideo, setCurrentVideo] = useState("");

  const [studentProgress, setStudentProgress] = useState<StudentProgress>();
  const apiUrl = "https://timizli.onrender.com/get_student_progress/f4amin";

  const playerRef = useRef(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the studentProgress state with the fetched data
        console.log(data);
        setStudentProgress(data);
        setCurrentVideo(
          data.course_content[0].list_of_obstacles[0].obstacle_url
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-3'>
        {/* <iframe className="w-full h-[70vh]" src={currentVideo} frameBorder="0" allowFullScreen></iframe> */}
        <div className='w-[100%] h-[75vh]'>
          {currentVideo ? (
            <>
              <ReactPlayer
                ref={playerRef}
                width={"100%"}
                height={"100%"}
                url={currentVideo}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0 },
                  },
                }}
              />
            </>
          ) : null}
        </div>

        <div>
          <Tabs
            defaultValue='notes'
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='notes'>Notes</TabsTrigger>
              <TabsTrigger value='discussion'>Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value='notes'>
              <p>Notes would come over here</p>
            </TabsContent>
            <TabsContent value='discussion'>
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-1'>
                    <Label htmlFor='current'>Current password</Label>
                    <Input
                      id='current'
                      type='password'
                    />
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='new'>New password</Label>
                    <Input
                      id='new'
                      type='password'
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div>
        <ScrollArea className='h-[92vh] px-2'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
          >
            {studentProgress ? (
              <>
                {[...studentProgress.course_content]
                  .reverse()
                  .map((item, idxPlaylist) => (
                    <AccordionItem
                      key={idxPlaylist}
                      value={item.play_list_tile}
                    >
                      <AccordionTrigger>{item.play_list_tile}</AccordionTrigger>

                      <AccordionContent>
                        {
                          item.list_of_obstacles.map((video, idx) => (
                            <p
                              key={idx}
                              className='cursor-pointer'
                              onClick={() =>
                                setCurrentVideo(video.obstacle_url)
                              }
                            >
                              Video {idx + 1}
                            </p>
                          ))
                          // {item.list_of_obstacles.map(video => console.log(video))}
                        }
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </>
            ) : null}
          </Accordion>
          {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
                <span onClick={()=>setCurrentVideo("https://www.youtube.com/embed/LzWb_P4lYgA")}>

              Yes. It's animated by default, but you can disable it if you prefer.

                </span>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
        </ScrollArea>
      </div>
    </div>
  );
}

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
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, useSession } from "next-auth/react";

export default function Classroom({ params }: { params: { classid: string } }) {
  const { data: session, status } = useSession();

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

  useEffect(() => {
    if (status === "unauthenticated") {
      handleSignIn();
    }
    console.log(status);
  }, [session, status]);

  const [currentVideo, setCurrentVideo] = useState("");

  const [studentProgress, setStudentProgress] = useState<any>();
  const apiUrl = "https://timizli.onrender.com/get_student_progress/f4amin";

  const playerRef = useRef(null);

  function markCompleted(idxPlaylist, idx, video) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_email: session.user?.email,
      video_id: video.video_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`https://timizli.onrender.com/trackprogress`, requestOptions).then(
      (response) => {}
    );

    var studentData = JSON.parse(JSON.stringify(studentProgress));
    var prev_val =
      studentData.progresss.sections[idxPlaylist].videos[idx].watched;
    if (prev_val === true) {
      studentData.progresss.sections[idxPlaylist].videos[idx].watched = false;
    } else {
      studentData.progresss.sections[idxPlaylist].videos[idx].watched = true;
    }

    setStudentProgress(studentData);
  }

  useEffect(() => {
    if (session) {
      console.log(session);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_email: session.user?.email,
        course_id: params.classid,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`https://timizli.onrender.com/user_course`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Update the studentProgress state with the fetched data
          console.log(data);
          setStudentProgress(data.content);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [session]);

  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-3'>
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
      </div>
      <div>
        <ScrollArea className='h-[92vh] px-2'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
          >
            {studentProgress && studentProgress.progresss.sections ? (
              <>
                {studentProgress.progresss.sections.map((item, idxPlaylist) => (
                  <AccordionItem
                    key={idxPlaylist}
                    value={item.section_name}
                  >
                    <AccordionTrigger>
                      <div>{item.section_name}</div>
                    </AccordionTrigger>

                    <AccordionContent>
                      {
                        item.videos.map((video, idx) => (
                          <div
                            className='flex items-center space-x-2 my-1'
                            key={idx}
                          >
                            <div
                              onClick={() =>
                                markCompleted(idxPlaylist, idx, video)
                              }
                            >
                              <Checkbox
                                checked={video && video.watched ? true : false}
                              />
                            </div>

                            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                              <p
                                key={idx}
                                className='cursor-pointer'
                                onClick={() => setCurrentVideo(video.video_url)}
                              >
                                {video.video_name}
                              </p>
                            </label>
                          </div>
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

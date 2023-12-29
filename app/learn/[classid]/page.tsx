"use client";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

// Render a YouTube video player
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React, { use, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress"
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
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
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
      callbackUrl: "/learn/" + params.classid,
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
  const [currentVideoName, setCurrentVideoName] = useState("");

  const [showingPlaylist, setShowingPlaylist] = useState(true);

  function markCompleted(idxPlaylist: any, idx: any, video: any) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_email: session?.user?.email,
      video_id: video.video_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`https://timizli.onrender.com/trackprogress`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }).then((response) => { });

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

  const [progressPercent, setProgressPercent] = useState(0);
  useEffect(() => {
    if (!studentProgress) {
      return
    }
    if (studentProgress && !studentProgress.progresss) {
      return
    }

    const totalPlaylists = studentProgress.progresss.sections.length;
    var totalVideos = 0;
    var watchedVideosCount = 0;
    console.log("Hel")
    // Iterate over all playlists
    for (let idxPlaylist = 0; idxPlaylist < totalPlaylists; idxPlaylist++) {
      const playlist = studentProgress.progresss.sections[idxPlaylist].videos;
      // Count the number of watched videos
      watchedVideosCount += playlist.reduce((count:any, video:any) => count + (video.watched ? 1 : 0), 0);

      // Calculate the percentage
      totalVideos += playlist.length;


    }
    const percentageWatched = Math.round((watchedVideosCount / totalVideos) * 100);
    setProgressPercent(percentageWatched)


  }, [studentProgress])

  useEffect(() => {
    if (session) {
      console.log(session);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_email: session.user?.email,
        coursexl_id: 'arabic-a1-to-c1',
      });

      fetch(`https://timizli.onrender.com/register/coursexl`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
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

          fetch(`https://timizli.onrender.com/user_course`, {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          })
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
              setCurrentVideo(data.content.progresss.sections[0].videos[0].video_url)
              setCurrentVideoName(data.content.progresss.sections[0].videos[0].video_name)
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

    }
  }, [session]);

  return (
    <div className='grid grid-cols-4'>
      <div className={showingPlaylist ? 'col-span-3' : 'col-span-4'}>
        <Button variant="outline" size="icon" onClick={() => setShowingPlaylist(!showingPlaylist)} className="float-right">
          {showingPlaylist ? <DoubleArrowRightIcon className="h-4 w-4" /> :
            <DoubleArrowLeftIcon className="h-4 w-4" />}
        </Button>
        <div className='w-[100%] h-[75vh]'>
          {currentVideo ? (

            <div className="w-3/4 mx-auto mt-4 h-[90%]">
              <div className="flex justify-between">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {currentVideoName}
                </h2>

              </div>
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
            </div>
          ) : null}
        </div>
      </div>
      <div className={showingPlaylist ? "border-l" : "hidden"}>
        {studentProgress ? <div className="pb-6 pt-2 border-b items-center flex px-2">
          <div className="w-[90%]">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight capitalize"> {studentProgress.course_id.replace("-", " ")}</h4>
            <Progress value={progressPercent} className="" />
            <p className="leading-7 [&:not(:first-child)]:mt-1">{progressPercent}% completed</p>
          </div>

        </div> : null}

        <ScrollArea className='h-[92vh]'>
          <Accordion
            type='single'
            collapsible
            className='w-full'
          >
            {studentProgress && studentProgress.progresss.sections ? (
              <>
                {studentProgress.progresss.sections.map(
                  (item: any, idxPlaylist: any) => (
                    <AccordionItem
                      key={idxPlaylist}
                      value={item.section_name}
                      className=""
                    >
                      <AccordionTrigger className="px-2">
                        <div>{item.section_name}</div>
                      </AccordionTrigger>

                      <AccordionContent className="px-2">
                        {
                          item.videos.map((video: any, idx: any) => (
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
                                  checked={
                                    video && video.watched ? true : false
                                  }
                                />
                              </div>

                              <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                <p
                                  key={idx}
                                  className='cursor-pointer'
                                  onClick={() => {
                                    setCurrentVideo(video.video_url)
                                    setCurrentVideoName(video.video_name)
                                  }
                                  }
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
                  )
                )}
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

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

export default function Page({ params }: { params: { courseid: string } }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/path/" + params.courseid);
    },
  });

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

      <div className='path-details m-4'>
        <p className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          About
        </p>
        <p className='pb-8'>
          For beginners venturing into the realm of literature and
          self-improvement, the name V. Rahim stands as a beacon of guidance and
          inspiration. With a vast body of work spanning across various genres,
          Rahim&apos;s books have become an invaluable resource for those
          seeking to embark on a journey of personal growth, self-discovery, and
          intellectual enrichment. <br />
          <br />
          V. Rahim&apos;s literary prowess transcends conventional boundaries,
          and their books cater to a diverse range of interests and preferences.
          Whether you are a novice or a seasoned reader, Rahim&apos;s works
          offer something profound and meaningful for everyone.
          <br />
          <br />
          One of the most remarkable aspects of V. Rahim&apos;s books is their
          ability to engage readers from all walks of life. Rahim has an innate
          talent for breaking down complex concepts and presenting them in a
          clear and accessible manner. This makes their books perfect for those
          who are just starting to explore the world of literature and
          self-help.
        </p>
        <p className='scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 '>
          Courses
        </p>
        <div className='flex flex-col space-y-3 w-1/2'>
          <Card>
            <CardHeader>
              <CardTitle>Arabic A1 to C1</CardTitle>
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
          <Card>
            <CardHeader>
              <CardTitle>Arabic A1 to C1</CardTitle>
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
          <Card>
            <CardHeader>
              <CardTitle>Arabic A1 to C1</CardTitle>
              <CardDescription>
                For beginners, based on V Rahims Books
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'></CardContent>
            <CardFooter>
              <Link href='/course/c'>
                <Button className='w-full'>
                  <HandIcon className='mr-2 h-4 w-4' /> View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <p>Hello from course main page: {params.courseid}</p>
    </>
  );
}

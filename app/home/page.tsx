"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { json } from "stream/consumers";
import book1 from '../../public/assets/images/book1.jpg';
import book2 from '../../public/assets/images/book2.jpg';
import book3 from '../../public/assets/images/book3.jpg';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  const { data: session, status } = useSession();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (session) {
      console.log(session);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_email: session.user?.email,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`https://timizli.onrender.com/user_courses`, {
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
          setEnrolledCourses(data.content);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [status]);
  return (
    <div className="w-10/12 mx-auto">
      <h2 className="scroll-m-20 pt-8 pb-8 text-3xl tracking-tight first:mt-0">
        Lecture Series
      </h2>

      <div className="flex space-x-8">
        {enrolledCourses.map((item: any, idx) => (

          <>
          <Link
                  href={"/learn/" + item.course_id}
                  key={idx}
                >
          <Image src={item.course_id == "book-1" ? book1 : (item.course_id == "book-2" ? book2: (item.course_id == "book-3" ? book3: book1)) } alt="book"
                width={200} height={300}
                // Make the image display full width
                // style={{
                //   width: '200',
                //   height: 'auto',
                // }}
                />
                </Link>
          </>

        ))}
      </div>
      
      <div className="mt-8">
      <a href="https://www.lqtoronto.com/downloads.html" target="#" className="text-blue-600 underline italic">Click to go to pdf download page(Books)</a>
      </div>


    </div>
  );
}

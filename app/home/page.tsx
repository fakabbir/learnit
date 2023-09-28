"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { json } from "stream/consumers";

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
    <>
      <p>Home Content</p>
      {enrolledCourses.map((item: any, idx) => (
        <Link
          href={"/learn/" + item.course_id}
          key={idx}
        >
          {item.progresss.course_name}
        </Link>
      ))}
    </>
  );
}

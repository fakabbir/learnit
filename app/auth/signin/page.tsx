"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInPage({
  params,
}: {
  params: { callbackUrl: string };
}) {
  const handleSignIn = async () => {
    alert(params.callbackUrl);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    alert(urlParams.get("callbackUrl"));
    const result = await signIn("google", {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirect: true,
      callbackUrl: urlParams.get("callbackUrl") as string,
    });
  };
  return (
    <>
      <Button onClick={handleSignIn}>SignIn</Button>
    </>
  );
}

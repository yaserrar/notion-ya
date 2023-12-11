"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleLogo from "@/public/google-icon.svg";
import { signIn } from "next-auth/react";

const AuthCard = () => {
  return (
    <div className="p-10 flex flex-col gap-4 border rounded-lg">
      <p className="text-xl font-bold">Authenticate with google</p>

      <Button
        className="flex gap-2"
        onClick={() =>
          signIn("google", { redirect: true, callbackUrl: "/documents" })
        }
      >
        <Image
          width={20}
          height={20}
          src={GoogleLogo}
          alt="google"
          className="mr-2 "
        />
        Login with google
      </Button>
    </div>
  );
};

export default AuthCard;

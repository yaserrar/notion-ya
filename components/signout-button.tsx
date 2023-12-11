"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const SignoutButton = () => {
  return <Button onClick={() => signOut()}>Sign out</Button>;
};

export default SignoutButton;

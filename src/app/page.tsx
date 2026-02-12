"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>Convex + AuthKit</h1>
      </div>
      <Authenticated>
        <UserButton />
        <div>Content authed!</div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
        <p>Please sign in to view data</p>
      </Unauthenticated>
    </div>
  );
}

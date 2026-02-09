"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>Convex + AuthKit</h1>
        <div className="flex gap-2">
          {user ? (
            <button type="button" onClick={() => signOut()}>
              Sign out
            </button>
          ) : (
            <>
              <Link href="/sign-in">
                <button type="button">Sign in</button>
              </Link>
              <Link href="/sign-up">
                <button type="button">Sign up</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Authenticated>
        <p>Welcome {user?.email}!</p>
      </Authenticated>
      <Unauthenticated>
        <p>Please sign in to view data</p>
      </Unauthenticated>
    </div>
  );
}

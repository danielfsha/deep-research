"use client";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  if (session?.user?.email) {
    return <p>welcome {session?.user?.email}</p>;
  }

  return <p>You are not authorized to view this page!</p>;
}

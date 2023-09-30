import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return children;
}

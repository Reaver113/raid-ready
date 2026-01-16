"use client";

import Login from "@/components/login/Login";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  if (!userAuthenticated) {
    return <Login />;
  }

  return <div>Authenticated User Content</div>;
}

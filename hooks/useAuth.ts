"use client";

import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status, update } = useSession();

  return {
    isAuthenticated: status === "authenticated",
    session,
    status,
    update,
    isLoading: status === "loading",
  };
};

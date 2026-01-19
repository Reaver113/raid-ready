import Landing from "@/components/landing/Landing";
import Login from "@/components/login/Login";
import Logout from "@/components/logout/Logout";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (!session) {
    return <Login />;
  }

  return (
    <>
      <Landing />
    </>
  );
}

import ClientSession from "@/components/ClientSession";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const serverSession = await getServerSession(authOptions);


  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl">Home</h1>
        <Link className={buttonVariants()} href={"/admin"}>Open my admin</Link>
      </div>

      <p className="mt-4 text-center max-w-lg">
        After login, turn the Network to fast 3G. The Client session will take a few
        seconds to show up, while the Server Session is directly available. Amazing right? 😎
      </p>

      <div className="flex gap-12 mt-10 p-8 bg-slate-200 rounded-2xl">
        <div>
          <h2>Client Session (client side):</h2>
          {/* use client so we export it */}
          <ClientSession/>
        </div>
        <div>
          <h2>Server Session (server side):</h2>
          <pre>{JSON.stringify(serverSession, null, 2)}</pre>
        </div>
      </div>
    </>
  )
}

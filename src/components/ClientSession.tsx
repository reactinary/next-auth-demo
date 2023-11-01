'use client'
import { useSession } from "next-auth/react"


function ClientSession() {
  const { data: session } = useSession();

  return (
    <pre>{JSON.stringify(session, null, 2)}</pre>
  )
}

export default ClientSession

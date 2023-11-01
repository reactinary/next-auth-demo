import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


async function AdminPage() {
  const session = await getServerSession(authOptions);
  console.log("ℹ️ SESSION from [admin/page.tsx]: ", session);
  console.log("---------");

  if(session?.user) {
    return (
      <h2 className="text-2xl">Admin page - welcome back {session?.user.username}</h2>
    )
  }

  return (
    <h2 className="text-2xl">Please login to see the admin page</h2>
  )
}

export default AdminPage

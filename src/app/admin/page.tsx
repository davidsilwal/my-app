import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-option"

export default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session) 
    {
      <h1>Hey</h1>
     }

  return (
    <h1>Hey there {session?.user?.permissions}</h1>
  );
}

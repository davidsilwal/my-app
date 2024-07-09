import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-option"


const content = () => <h1>Hey there</h1>

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <> {session?.user.email}</>
  );
}

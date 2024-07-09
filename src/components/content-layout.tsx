import { Navbar } from "@/components/navbar";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-option"

interface ContentLayoutProps {
  children: React.ReactNode;
}

export async function ContentLayout({ children }: ContentLayoutProps) {

  const session = await getServerSession(authOptions)

  return (
    <div>
      {session && <Navbar />}
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-option"


async function hasPermission(permission: string) {
    const session = await getServerSession(authOptions)

    if (!session?.user)
        return false;

    debugger;

    return session.user.permissions?.includes(permission) ?? false;
}

export { hasPermission };
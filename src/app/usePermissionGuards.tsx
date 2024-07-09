'use client';

import { useSession } from "next-auth/react";

function hasPermission(permission: string) {
    const { data: session } = useSession({ required: true }) ;

    if (!session?.user)
        return false;

    debugger;

    return session.user.permissions?.includes(permission) ?? false;
}

export { hasPermission };
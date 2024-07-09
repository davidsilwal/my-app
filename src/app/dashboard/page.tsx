'use client';

import Permissions from "../permissions";
import { hasPermission } from "../usePermissionGuards";

const DashboardPage = () => {
    const canReadUsers = hasPermission(Permissions.ReadGroup.toString());

    return (
        <>{canReadUsers ? 'Dashboard' : 'Forbidden'}</>
    )
}

export default DashboardPage
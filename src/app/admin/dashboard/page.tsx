import { hasPermission } from "@/app/usePermissionGuards";
import Permissions from "@/app/permissions";


const DashboardPage = async () => {
    const canReadUsers = await hasPermission(Permissions.ReadGroup.toString());

    return (
        <>{canReadUsers ? 'Dashboard' : 'Forbidden'}</>
    )
}

export default DashboardPage
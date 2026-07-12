import { DashboardNavigationItem } from "../components/dashboard/sidebar/constants";

export const isActive = (item: Omit<DashboardNavigationItem, 'icon'>, pathname: string) => {
    if (item.href === "/dashboard") {
        return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
};
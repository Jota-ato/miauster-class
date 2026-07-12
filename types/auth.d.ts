import { auth } from "@/lib/auth";

declare module "better-auth" {
    interface User {
        role: "admin" | "seller" | "waiting";
    }
}
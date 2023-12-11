import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getAuthSession = () => getServerSession(authOptions);

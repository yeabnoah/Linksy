import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// a function to get users session and authenticates the user -----
const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export default getUserSession;

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export default getUserSession;

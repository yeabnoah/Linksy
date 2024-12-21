import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await authClient.getSession();

  if (session.data?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="  h-screen dark:bg-black bg-black w-full flex items-center justify-center">
      <h1 className=" text-4xl font-bold text-center">Hello, World!</h1>
    </div>
  );
}

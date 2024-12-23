"use client";

// import ButtonUI from "@/components/lib/button-lib";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const session = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center text-xl">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-96 h-auto dark:bg-white/5 shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img
          src={session.data?.user.image || "/default-avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-semibold">
          {session.data?.user.name || "Guest User"}
        </h2>
        <p className="text-gray-300">
          {session.data?.user.email || "No email provided"}session.data?.user.
        </p>

        <Button
          className=" my-5"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            });
          }}
        >
          Logout
        </Button>

        {/* <ButtonUI
          // variant="danger"
          // size="md"
          // variant="success"
          onclickFunc={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            });
          }}
        >
          Sign Out
        </ButtonUI> */}
      </div>
    </div>
  );
};

export default Dashboard;

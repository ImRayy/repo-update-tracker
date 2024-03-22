import AddRepo from "@/components/addRepo";
import AddTgChatId from "@/components/addTgChatId";
import Cards from "@/components/dashboard/cards";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { useSigninCheck } from "reactfire";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const { status, data: signInCheckResult } = useSigninCheck();
  if (status === "loading") {
    return <div>Fetching user...</div>;
  }
  return (
    <>
      <Toaster />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-4 sm:p-10 sm:pt-4 ${inter.className}`}
      >
        <div className="z-10 w-full max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex">
          <section className="mb-2 inline-flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="inline-flex items-center gap-2">
              <AddTgChatId />
              <AddRepo />
            </div>
          </section>
          {signInCheckResult.signedIn ? (
            <Cards
              dbType="firestore"
              userId={signInCheckResult.user?.uid ?? ""}
            />
          ) : (
            <Cards dbType="localStorage" />
          )}
        </div>
      </main>
    </>
  );
}

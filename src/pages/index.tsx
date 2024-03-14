import AddRepo from "@/components/addRepo";
import Cards from "@/components/dashboard/cards";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <Toaster />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-4 sm:p-10 sm:pt-4 ${inter.className}`}
      >
        {/* <FirestoreProvider sdk={FirestoreInstance}> */}
        <div className="z-10 w-full max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex">
          <section className="mb-2 inline-flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <AddRepo />
          </section>
          <Cards />
        </div>
        {/* </FirestoreProvider> */}
      </main>
    </>
  );
}

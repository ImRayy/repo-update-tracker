import AddRepo from "@/components/addRepo";
import { Inter } from "next/font/google";
import { FirestoreProvider } from "reactfire";
import { db as FirestoreInstance } from "@/lib/firebase";
import { Toaster } from "@/components/ui/toaster";
import Cards from "@/components/dashboard/cards";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <Toaster />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-4 sm:p-10 sm:pt-4 ${inter.className}`}
      >
        <FirestoreProvider sdk={FirestoreInstance}>
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
            <section className="inline-flex mb-2 items-center justify-between w-full shadow-sm border p-2 rounded-md">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <AddRepo />
            </section>
            <Cards />
          </div>
        </FirestoreProvider>
      </main>
    </>
  );
}

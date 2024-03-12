import AddRepo from "@/components/addRepo";
import { Inter } from "next/font/google";
import { FirestoreProvider } from "reactfire";
import { db as FirestoreInstance } from "@/lib/firebase";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Toaster />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Repo update tracker</h1>
      </div>
      <FirestoreProvider sdk={FirestoreInstance}>
        <AddRepo />
      </FirestoreProvider>
    </main>
  );
}

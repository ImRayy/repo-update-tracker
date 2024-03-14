import { Toaster } from "@/components/ui/toaster";
import { firebaseConfig } from "@/lib/firebase";
import { db as FirestoreInstance } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, FirebaseAppProvider } from "reactfire";
import { FirestoreProvider } from "reactfire";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Toaster />
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={FirestoreInstance}>
          <Component {...pageProps} />
        </FirestoreProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}

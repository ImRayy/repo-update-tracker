import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "@/lib/firebase";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Component {...pageProps} />
    </FirebaseAppProvider>
  );
}

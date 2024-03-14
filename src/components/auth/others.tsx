import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import React from "react";
import { useAuth } from "reactfire";
import MDIAnonymous from "../icons/anonymous";
import FlatColorIconsGoogle from "../icons/google";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Divider from "./divider";

const Others = () => {
  const { toast } = useToast();
  const auth = useAuth();
  const signInWithGoogleHandler = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const signInAnonymouslyHandler = async () => {
    await signInAnonymously(auth)
      .then(() => toast({ title: "Successfully signed in!" }))
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Divider text="or" />
      <div className="inline-flex w-full space-x-4">
        <Button
          variant="outline"
          className="w-full space-x-2"
          onClick={signInAnonymouslyHandler}
        >
          <MDIAnonymous fontSize={18} />
          <span>Anonymous</span>
        </Button>
        <Button
          variant="outline"
          className="w-full space-x-2"
          onClick={signInWithGoogleHandler}
        >
          <FlatColorIconsGoogle fontSize={18} />
          <span>Google</span>
        </Button>
      </div>
    </>
  );
};

export default Others;

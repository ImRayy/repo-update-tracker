import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import React from "react";
import { useAuth } from "reactfire";
import MDIGithub from "../icons/github";
import FlatColorIconsGoogle from "../icons/google";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Divider from "./divider";

const Others = () => {
  const { toast } = useToast();
  const auth = useAuth();
  const signInHandler = async (type: "google" | "github") => {
    if (type === "google") {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then(() =>
        toast({ title: "Successfully signed in with Google" })
      );
    } else if (type === "github") {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider).then(() =>
        toast({ title: "Successfully signed in with GitHub" })
      );
    }
  };

  return (
    <>
      <Divider text="or" />
      <div className="inline-flex w-full space-x-4">
        <Button
          variant="outline"
          className="w-full space-x-2"
          onClick={() => signInHandler("github")}
        >
          <MDIGithub fontSize={18} />
          <span>GitHub</span>
        </Button>
        <Button
          variant="outline"
          className="w-full space-x-2"
          onClick={() => signInHandler("google")}
        >
          <FlatColorIconsGoogle fontSize={18} />
          <span>Google</span>
        </Button>
      </div>
    </>
  );
};

export default Others;

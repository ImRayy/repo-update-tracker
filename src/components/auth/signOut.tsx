import React from "react";
import { useAuth } from "reactfire";
import { Button } from "../ui/button";

const SignOut = () => {
  const auth = useAuth();
  // Sign out handler
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return <Button onClick={handleSignOut}>Log Out</Button>;
};

export default SignOut;

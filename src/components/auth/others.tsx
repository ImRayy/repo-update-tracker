import React from "react";
import MDIAnonymous from "../icons/anonymous";
import FlatColorIconsGoogle from "../icons/google";
import { Button } from "../ui/button";
import Divider from "./divider";

const Others = () => {
  return (
    <>
      <Divider text="or" />
      <div className="inline-flex w-full space-x-4">
        <Button variant="outline" className="space-x-2 w-full">
          <MDIAnonymous fontSize={18} />
          <span>Anonymous</span>
        </Button>
        <Button variant="outline" className="w-full space-x-2">
          <FlatColorIconsGoogle fontSize={18} />
          <span>Google</span>
        </Button>
      </div>
    </>
  );
};

export default Others;

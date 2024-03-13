import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "../ui/button";
import Others from "./others";

const SignUp = () => {
  return (
    <form action="">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm">
              Email
            </label>
            <Input id="email" placeholder="example@gmail.com" />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input id="password" placeholder="password" />
          </div>
          <div className="space-y-1">
            <label htmlFor="confirm-password" className="text-sm">
              Confirm Password
            </label>
            <Input id="confirm-password" placeholder="confirm password" />
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col">
          <Button className="w-full">Register</Button>
          <Others />
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUp;

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

const SignIn = () => {
  return (
    <form action="">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
        </CardContent>
        <CardFooter className="w-full flex flex-col">
          <Button className="w-full">Log In</Button>
          <Others />
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignIn;

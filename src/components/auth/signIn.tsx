import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "reactfire";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import Others from "./others";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const auth = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => toast({ title: "Successfully logged in!" }))
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Checkout your email & password again",
        });
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex w-full flex-col">
        <Button className="w-full" type="submit" form="login-form">
          Log In
        </Button>
        <Others />
      </CardFooter>
    </Card>
  );
};

export default SignIn;

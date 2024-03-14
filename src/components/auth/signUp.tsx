import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "reactfire";
import { Button } from "../ui/button";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [showPassError, setShowPassError] = useState(false);
  const auth = useAuth();

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password !== data.confirmPassword) {
      setShowPassError(true);
      return;
    }
    createUserWithEmailAndPassword(auth, data.email, data.password);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <form id="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register("email", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="confirm password"
              {...register("confirmPassword", { required: true })}
            />
            {showPassError && (
              <label
                htmlFor="confirmPassword"
                className="text-xs font-bold text-red-500"
              >
                {watch("password") !== watch("confirmPassword") &&
                  "Password do not match"}
              </label>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex w-full flex-col">
        <Button type="submit" form="register-form" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;

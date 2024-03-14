import { useRouter } from "next/router";
import { useSigninCheck } from "reactfire";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SignIn from "./signIn";
import SignUp from "./signUp";

const AuthForm = () => {
  const { data: signInCheckResult } = useSigninCheck();
  const router = useRouter();
  if (signInCheckResult) {
    if (signInCheckResult.signedIn !== true) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <SignIn />
            </TabsContent>
            <TabsContent value="register">
              <SignUp />
            </TabsContent>
          </Tabs>
        </div>
      );
    } else router.push("/");
  }
};
export default AuthForm;

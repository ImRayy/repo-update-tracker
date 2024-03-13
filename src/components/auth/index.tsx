import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SignIn from "./signIn";
import SignUp from "./signUp";

const Auth = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
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
};
export default Auth;

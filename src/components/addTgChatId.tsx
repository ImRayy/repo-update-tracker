import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFirestore, useSigninCheck } from "reactfire";
import MingcuteTelegram from "./icons/telegram";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Modal from "./ui/modal";
import { useToast } from "./ui/use-toast";

type Inputs = {
  chatId: string;
};

const AddTgChatId = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const firestore = useFirestore();
  const { data: user } = useSigninCheck();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (user.signedIn) {
      const ref = doc(firestore, "users", user.user.uid);
      await setDoc(ref, { chatId: data.chatId })
        .then(() => toast({ title: "Successfully added your chat id" }))
        .catch(() =>
          toast({ variant: "destructive", title: "Error adding chat id" })
        );
      setIsOpen(false);
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("chatId", data.chatId);
      setIsOpen(false);
      window.location.reload();
    }
  };

  return (
    <Modal
      title="Add Telegram Chat ID"
      description="Enter your Telegram Chat ID"
      btnLabel={
        <Button className="inline-flex items-center gap-2" size="icon">
          <MingcuteTelegram fontSize={18} />
        </Button>
      }
      open={isOpen}
      setOpen={setIsOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          type="text"
          id="chatId"
          placeholder="Chat Id"
          {...register("chatId", { required: true })}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default AddTgChatId;

import { RepoReleaseData } from "@/types/repoData";
import React from "react";
import MingcuteTelegram from "../icons/telegram";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface SendPostToTGProps {
  chatId: string;
  releaseData: RepoReleaseData | undefined;
}

const SendPostToTG = ({ chatId, releaseData }: SendPostToTGProps) => {
  const { toast } = useToast();

  const telegramMessageHandler = async (text: string | undefined) => {
    if (text !== undefined && text !== "") {
      const encodedText = encodeURIComponent(text);
      const apiUrl = `/api/sendPost?chatId=${chatId}&body=${encodedText}`;
      await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            toast({ title: "Message sent!" });
          } else toast({ variant: "destructive", title: "Message not sent" });
        });
    }
  };
  if (!chatId) {
    return;
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      className="space-x-1 bg-[#30A3E6] text-white hover:bg-[#1daafb]"
      onClick={() => telegramMessageHandler(releaseData?.body)}
    >
      <MingcuteTelegram fontSize={18} color="white" />
      <span>Telegram</span>
    </Button>
  );
};

export default SendPostToTG;

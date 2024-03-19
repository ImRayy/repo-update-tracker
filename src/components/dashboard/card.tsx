import { CircleCheck } from "lucide-react";
import React from "react";
import MingcuteTelegram from "../icons/telegram";
import { Button } from "../ui/button";
import InfoCard from "./infoCard";
import VersionBadge from "./versionBadge";

interface CardProps {
  title: string;
  description?: string;
  thumbnail: string;
  version: string;
  newVersion?: string | undefined;
}
const Card = ({
  title,
  description,
  thumbnail,
  version,
  newVersion,
}: CardProps) => {
  return (
    <div className="grid select-none grid-cols-5 gap-2 rounded-md border p-2">
      <section className="col-span-1 aspect-square overflow-hidden rounded-md">
        <img src={thumbnail} alt={title} />
      </section>
      <section className="col-span-4 flex flex-col justify-between">
        <div className="inline-flex gap-4">
          <ul className="space-y-1">
            <li className="font-bold">{title}</li>
            <li className="line-clamp-3 text-xs">{description}</li>
            <li className="space-x-2 font-bold ">
              <VersionBadge version={version} newVersion={newVersion} />
            </li>
          </ul>
          <span>
            <InfoCard repo={title} />
          </span>
        </div>
        <div className="pt-full space-x-2 pt-4">
          <Button
            variant="secondary"
            size="sm"
            className="space-x-1 bg-[#30A3E6] text-white hover:bg-[#1daafb]"
          >
            <MingcuteTelegram fontSize={18} color="white" />
            <span>Telegram</span>
          </Button>
          <Button variant="secondary" size="sm" className="space-x-1">
            <CircleCheck size={18} className="text-green-600" />
            <span>Done</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Card;

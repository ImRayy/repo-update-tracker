import { fetchFromGitHub } from "@/lib/GitHub";
import { RepoReleaseData } from "@/types/repoData";
import { CircleCheck } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import InfoCard from "./infoCard";
import SendPostToTG from "./sendPostToTG";
import VersionBadge from "./versionBadge";

interface CardProps {
  chatId?: string;
  title: string;
  description?: string;
  thumbnail: string;
  version: string;
  newVersion?: string | undefined;
}

const Card = ({
  chatId,
  title,
  description,
  thumbnail,
  version,
  newVersion,
}: CardProps) => {
  const [releaseData, setReleaseData] = useState<RepoReleaseData>();

  useEffect(() => {
    (async () => {
      if (title && title !== "") {
        const res = await fetchFromGitHub(title, "releases");
        setReleaseData(res[0]);
      }
    })();
  }, [title]);

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
            <InfoCard title={title} releaseData={releaseData} />
          </span>
        </div>
        <div className="pt-full space-x-2 pt-4">
          <SendPostToTG releaseData={releaseData} chatId={chatId ?? ""} />
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

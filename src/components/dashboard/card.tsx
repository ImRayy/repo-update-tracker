import React from "react";
import VersionBadge from "./versionBadge";

interface CardProps {
  title: string;
  description?: string;
  thumbnail: string;
  url: string;
  version: string;
  newVersion?: string | undefined;
}
const Card = ({
  title,
  description,
  thumbnail,
  url,
  version,
  newVersion,
}: CardProps) => {
  return (
    <a href={url} className="flex select-none gap-2 rounded-md border p-2">
      <div className="aspect-square w-3/12 overflow-hidden rounded-md md:w-4/12 lg:w-3/12">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="w-7/12 md:w-8/12 lg:w-7/12">
        <ul className="space-y-1">
          <li className="font-bold">{title}</li>
          <li className="line-clamp-3 text-xs">{description}</li>
          <li className="space-x-2 font-bold ">
            <VersionBadge version={version} newVersion={newVersion} />
          </li>
        </ul>
      </div>
    </a>
  );
};

export default Card;

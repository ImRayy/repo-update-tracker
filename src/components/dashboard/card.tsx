import React from "react";
interface CardProps {
  title: string;
  description?: string;
  thumbnail: string;
  url: string;
}
const Card = ({ title, description, thumbnail, url }: CardProps) => {
  return (
    <a href={url} className="flex gap-2 border p-2 rounded-md select-none">
      <div className="aspect-square lg:w-3/12 w-3/12 md:w-4/12 overflow-hidden rounded-md">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="w-7/12 lg:w-7/12 md:w-8/12">
        <ul className="space-y-1">
          <li className="font-bold">{title}</li>
          <li className="line-clamp-3 text-xs">{description}</li>
          <li className="space-x-2 font-bold ">
            <span className="text-red-500">v2.3.1</span>
            <span>&gt;</span>
            <span className="text-green-500">v2.3.4</span>
          </li>
        </ul>
      </div>
    </a>
  );
};

export default Card;

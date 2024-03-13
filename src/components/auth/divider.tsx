import React from "react";

const Divider = ({ text }: { text: string }) => {
  return (
    <div className="inline-flex py-2 gap-4 w-full items-center text-sm font-bold text-gray-500">
      <div className="w-full items-center">
        <hr className="border-[1px]" />
      </div>
      <span>{text}</span>
      <div className="w-full items-center">
        <hr className="border-[1px]" />
      </div>
    </div>
  );
};

export default Divider;

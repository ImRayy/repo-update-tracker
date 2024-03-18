import React from "react";

type VersionBadgeProps = {
  version: string;
  newVersion?: string | undefined;
};

const VersionBadge = ({ version, newVersion }: VersionBadgeProps) => {
  if (newVersion !== "") {
    return (
      <>
        <span className="text-red-500">{version}</span>
        <span>&gt;</span>
        <span className="text-green-500">{newVersion}</span>
      </>
    );
  }
  return <span className="text-gray-600">{version}</span>;
};

export default VersionBadge;

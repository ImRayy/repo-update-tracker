import { RepoReleaseData } from "@/types/repoData";
import { Info } from "lucide-react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import Modal from "../ui/modal";

const InfoCard = ({
  title,
  releaseData,
}: {
  title: string;
  releaseData: RepoReleaseData | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (releaseData) {
    return (
      <Modal
        title={title}
        description={`Version: ${releaseData?.tag_name}`}
        btnLabel={
          <Button
            variant="secondary"
            className="h-8 w-8"
            size="icon"
            radius="full"
          >
            <Info size={18} />
          </Button>
        }
        open={isOpen}
        setOpen={setIsOpen}
      >
        <div className="h-96 overflow-y-scroll">
          {releaseData && (
            <>
              <h3>{releaseData.tag_name}</h3>
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
                {releaseData.body}
              </ReactMarkdown>
            </>
          )}
        </div>
      </Modal>
    );
  }
  return <div>No release found!</div>;
};

export default InfoCard;

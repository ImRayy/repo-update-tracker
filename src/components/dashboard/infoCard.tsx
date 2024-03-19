import { fetchFromGitHub } from "@/lib/GitHub";
import { RepoReleaseData } from "@/types/repoData";
import { Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import Modal from "../ui/modal";

const InfoCard = ({ repo }: { repo: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [releaseData, setReleaseData] = useState<RepoReleaseData>();
  useEffect(() => {
    (async () => {
      if (repo && repo !== "") {
        const res = await fetchFromGitHub(repo, "releases");
        setReleaseData(res[0]);
      }
    })();
  }, [repo]);

  return (
    <Modal
      title={repo}
      description={`Version: ${releaseData?.tag_name}`}
      btnLabel={
        <Button variant="secondary" size="icon" radius="full">
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
};

export default InfoCard;

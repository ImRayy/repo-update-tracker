import { fetchFromGitHub } from "@/lib/GitHub";
import { addRepoToLocalStorage } from "@/utils/syncData";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import { useFirestore, useUser } from "reactfire";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Modal from "./ui/modal";
import { useToast } from "./ui/use-toast";

const AddRepo = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const user = useUser();
  const firestore = useFirestore();
  const fromSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let repo = formData.get("repo");
    if (repo !== "") {
      repo = (repo as string).split("/").splice(3).join("/");
      const repoData = await fetchFromGitHub(repo);
      const repoReleases = await fetchFromGitHub(repo, "releases");
      if (repoData) {
        const data = {
          avatar_url: repoData.owner.avatar_url,
          name: repo,
          description: repoData.description ?? "",
          url: repoData.html_url,
          version: repoReleases[0]?.tag_name ?? "",
          published_at: (repoReleases[0]?.published_at as string) ?? "",
        };
        if (user.status === "success" && user.data) {
          const ref = doc(
            firestore,
            "users",
            user.data.uid,
            "repos",
            repoData.full_name.split("/").join("-")
          );
          const snapshot = await getDoc(ref);
          if (snapshot.exists()) {
            toast({
              variant: "destructive",
              title: "Repo already exists!",
            });
            setOpen(false);
          } else {
            try {
              setDoc(ref, data);
              toast({
                title: "Successfully added repo!",
              });
              setOpen(false);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error("Error");
            }
          }
        } else {
          addRepoToLocalStorage(data);
          setOpen(false);
          toast({
            title: "Successfully added repo!",
          });
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add new repo"
      btnLabel={
        <Button className="inline-flex items-center gap-2">
          <CirclePlus size={20} />
          Add repo
        </Button>
      }
    >
      <form onSubmit={fromSubmitHandler} className={`grid items-start gap-4`}>
        <div className="grid gap-2">
          <Input
            type="text"
            id="repo"
            name="repo"
            placeholder="Ex. https://github.com/ImRayy/dotfiles"
          />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Modal>
  );
};

export default AddRepo;

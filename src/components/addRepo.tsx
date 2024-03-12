import { fetchFromGitHub } from "@/lib/GitHub";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import { useFirestore } from "reactfire";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Modal from "./ui/modal";
import { useToast } from "./ui/use-toast";

const AddRepo = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const fromSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const repo = formData.get("repo");
    if (repo !== "") {
      const repoData = await fetchFromGitHub(
        (repo as string).split("/").splice(3).join("/")
      );
      if (repoData) {
        const ref = doc(
          firestore,
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
            setDoc(ref, {
              name: repoData.name,
              description: repoData.description ?? "",
              url: repoData.url,
            });
            toast({
              title: "Successfully added repo!",
            });
            setOpen(false);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error");
          }
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
        <Button className="inline-flex gap-2 items-center">
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

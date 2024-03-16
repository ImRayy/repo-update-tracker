import { RepoData } from "@/types/repoData";
import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Card from "./card";

const CardsFirestore = ({ userId }: { userId: string }) => {
  const firestore = useFirestore();
  const ref = collection(firestore, "users", userId, "repos");
  const { status, data } = useFirestoreCollectionData(ref);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {data.map((repo, i) => (
        <Card
          key={i}
          title={repo.name}
          description={repo.description}
          thumbnail={repo.avatar_url}
          url={repo.url}
        />
      ))}
    </div>
  );
};

const CardsLocalStorage = () => {
  const [data, setData] = useState<RepoData[]>([]);
  useEffect(() => {
    if (typeof window.localStorage !== "undefined" && window.localStorage) {
      const newData: RepoData[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("repo-")) {
          const value = localStorage.getItem(key);
          if (value) {
            newData.push(JSON.parse(value));
          }
        }
      }
      setData(newData);
    }
  }, []);
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {data.map((repo, i) => (
        <Card
          key={i}
          title={repo.name}
          description={repo.description}
          thumbnail={repo.avatar_url}
          url={repo.url}
        />
      ))}
    </div>
  );
};

type CardsProps =
  | { dbType: "firestore"; userId: string }
  | { dbType: "localStorage" };

const Cards = (props: CardsProps) => {
  if (props.dbType === "firestore") {
    return <CardsFirestore userId={props.userId} />;
  } else if (props.dbType === "localStorage") {
    return <CardsLocalStorage />;
  }
};
export default Cards;

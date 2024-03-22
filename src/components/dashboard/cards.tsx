import { fetchLatestVersion } from "@/lib/GitHub";
import { RepoData } from "@/types/repoData";
import { DocumentData, collection, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import Card from "./card";

const CardsFirestore = ({ userId }: { userId: string }) => {
  const [repoData, setRepoData] = useState<DocumentData[]>([]);
  const firestore = useFirestore();
  const ref = collection(firestore, "users", userId, "repos");
  const refUserData = doc(firestore, "users", userId);

  const { status, data } = useFirestoreCollectionData(ref);
  const { status: userStatus, data: userData } =
    useFirestoreDocData(refUserData);

  useEffect(() => {
    (async () => {
      const list = [];
      if (status === "loading") return;
      for (let i = 0; i < data.length; i++) {
        const { version: newVersion } = await fetchLatestVersion(
          data[i].name,
          data[i].published_at
        );
        list.push(Object.assign(data[i], { newVersion: newVersion }));
      }
      setRepoData(list);
    })();
  }, [status, data, userStatus]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-2 md:grid-cols-2">
      {repoData.map((repo, i) => (
        <Card
          key={i}
          title={repo.name}
          description={repo.description}
          thumbnail={repo.avatar_url}
          version={repo.version}
          newVersion={repo.newVersion}
          chatId={userData?.chatId}
        />
      ))}
    </div>
  );
};

const CardsLocalStorage = () => {
  const [data, setData] = useState<RepoData[]>([]);
  const [chatId, setChatId] = useState("");
  useEffect(() => {
    (async () => {
      if (typeof window.localStorage !== "undefined" && window.localStorage) {
        setChatId(localStorage.getItem("chatId") ?? "");
        const newData: RepoData[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          // fetching all data from localStorage
          const key = localStorage.key(i);
          if (key && key.startsWith("repo-")) {
            // fetching data from repo that starts with repo
            const value = localStorage.getItem(key);
            if (value) {
              const parsedData = JSON.parse(value);

              // checks for new version
              const { version: newVersion } = await fetchLatestVersion(
                parsedData.name,
                parsedData.published_at
              );

              newData.push(
                // appending new object filed to repo data
                Object.assign(parsedData, {
                  newVersion: newVersion,
                })
              );
            }
          }
        }
        setData(newData);
      }
    })();
  }, []);
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {data.map((repo, i) => (
        <Card
          key={i}
          title={repo.name}
          description={repo.description}
          thumbnail={repo.avatar_url}
          version={repo.version}
          newVersion={repo.newVersion}
          chatId={chatId}
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
  }
  return <CardsLocalStorage />;
};
export default Cards;

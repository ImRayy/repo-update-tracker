import React from "react";
import Card from "./card";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";

const Cards = () => {
  const firestore = useFirestore();
  const ref = collection(firestore, "repos");
  const { status, data } = useFirestoreCollectionData(ref, { suspense: true });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid md:grid-cols-2 gap-2">
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

export default Cards;

import { fetchLatestVersion } from "@/lib/GitHub";
import { RepoData } from "@/types/repoData";

export function addRepoToLocalStorage(repo: RepoData) {
  if (typeof window.localStorage !== "undefined" && window.localStorage) {
    if (typeof repo.name !== "undefined")
      localStorage.setItem(`repo-${repo.name}`, JSON.stringify(repo));
  }
}

interface FetchFromLocalStorage {
  dataType: "default" | "latest";
}

export const fetchFromLocalStorage = async ({
  dataType,
}: FetchFromLocalStorage): Promise<{
  chatId: string | undefined;
  data: RepoData[];
}> => {
  const newData: RepoData[] = [];
  let chatId: string = "";
  if (typeof window.localStorage !== "undefined" && window.localStorage) {
    chatId = localStorage.getItem("chatId") ?? "";
    for (let i = 0; i < localStorage.length; i++) {
      // fetching all data from localStorage
      const key = localStorage.key(i);
      if (key && key.startsWith("repo-")) {
        // fetching data from repo that starts with repo
        const localStorageData = localStorage.getItem(key);
        if (localStorageData) {
          const parsedData = JSON.parse(localStorageData);
          if (dataType === "latest") {
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
          } else {
            newData.push(parsedData);
          }
        }
      }
    }
  }
  return { chatId: chatId, data: newData };
};

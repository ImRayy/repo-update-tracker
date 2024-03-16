import { RepoData } from "@/types/repoData";

export function addRepoToLocalStorage(repo: RepoData) {
  if (typeof window.localStorage !== "undefined" && window.localStorage) {
    if (typeof repo.name !== "undefined")
      localStorage.setItem(`repo-${repo.name}`, JSON.stringify(repo));
  }
}

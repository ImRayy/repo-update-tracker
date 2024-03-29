import { convertDateToTime } from "@/utils/timeDate";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const fetchFromGitHub = async (repo: string, fetchType?: "releases") => {
  try {
    const { data } = await octokit.request(
      `GET /repos/{owner}/{repo}/${fetchType !== undefined ? fetchType : ""}`,
      {
        owner: repo.split("/")[0],
        repo: repo.split("/")[1],
      }
    );
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("No such repo found");
  }
};

export async function fetchLatestVersion(
  repo: string,
  publishedAt: string
): Promise<{ version: string }> {
  let version = "";
  await fetchFromGitHub(repo, "releases").then((res) => {
    if (
      convertDateToTime(res[0].published_at) > convertDateToTime(publishedAt)
    ) {
      version = res[0].tag_name;
    }
  });
  return {
    version: version,
  };
}

export { fetchFromGitHub };

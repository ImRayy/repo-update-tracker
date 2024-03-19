export interface RepoData {
  avatar_url: string;
  description: string;
  name: string;
  url: string;
  version: string;
  newVersion?: string;
}

export interface RepoReleaseAssets {
  name: string;
  content_type: string;
  url: string;
  browser_download_url: string;
  size: number;
}
export interface RepoReleaseData {
  tag_name: string;
  body: string;
  assets: RepoReleaseAssets[];
}

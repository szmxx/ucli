import fetch from "node-fetch-native";

const baseURL = process.env.API_BASE_URL || "https://api.github.com";

export async function createRepo(data: Record<string, unknown>, auth?: string) {
  const token = auth || process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error("GitHub token is required. Please provide it as parameter or set GITHUB_TOKEN environment variable.");
  }

  return fetch(`${baseURL}/user/repos`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function deleteRepo(owner: string, repo: string, auth?: string) {
  const token = auth || process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error("GitHub token is required. Please provide it as parameter or set GITHUB_TOKEN environment variable.");
  }

  return fetch(`${baseURL}/repos/${owner}/${repo}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export async function getCurrentUser(auth?: string) {
  const token = auth || process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error("GitHub token is required. Please provide it as parameter or set GITHUB_TOKEN environment variable.");
  }

  return fetch(`${baseURL}/user`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

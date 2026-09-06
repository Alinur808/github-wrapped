const API_BASE = "https://api.github.com";

class GithubWrappedError extends Error {
  constructor(message) {
    super(message);
    this.name = "GithubWrappedError";
  }
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (response.status === 404) {
    throw new GithubWrappedError("That GitHub user doesn't exist. Double-check the username.");
  }

  if (response.status === 403) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      throw new GithubWrappedError(
        "GitHub's API rate limit was hit (this app calls it directly from your browser, unauthenticated). Try again in a few minutes."
      );
    }
    throw new GithubWrappedError("GitHub API request was forbidden.");
  }

  if (!response.ok) {
    throw new GithubWrappedError(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

async function fetchAllRepos(username) {
  const repos = [];
  let page = 1;

  while (page <= 5) {
    const batch = await fetchJson(
      `${API_BASE}/users/${username}/repos?per_page=100&page=${page}&sort=updated`
    );
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  return repos;
}

function summarizeLanguages(repos) {
  const totals = {};
  for (const repo of repos) {
    if (!repo.language) continue;
    totals[repo.language] = (totals[repo.language] || 0) + 1;
  }

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const totalCount = sorted.reduce((sum, [, count]) => sum + count, 0);

  return sorted.map(([language, count]) => ({
    language,
    count,
    percent: totalCount === 0 ? 0 : Math.round((count / totalCount) * 100),
  }));
}

export async function fetchGithubWrapped(username) {
  const cleanUsername = username.trim().replace(/^@/, "");
  if (!cleanUsername) {
    throw new GithubWrappedError("Type a GitHub username first.");
  }

  const [user, repos] = await Promise.all([
    fetchJson(`${API_BASE}/users/${cleanUsername}`),
    fetchAllRepos(cleanUsername),
  ]);

  const ownRepos = repos.filter((repo) => !repo.fork);
  const forkedRepos = repos.filter((repo) => repo.fork);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForksReceived = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const mostStarredRepo = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0] || null;

  const languages = summarizeLanguages(repos);

  const createdAt = new Date(user.created_at);
  const accountAgeDays = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / 86_400_000));
  const accountAgeYears = Math.floor(accountAgeDays / 365);

  const followerRatio = user.following === 0 ? user.followers : user.followers / user.following;

  return {
    user,
    repos,
    ownRepoCount: ownRepos.length,
    forkedRepoCount: forkedRepos.length,
    totalStars,
    totalForksReceived,
    mostStarredRepo,
    languages,
    topLanguage: languages[0] || null,
    createdAt,
    accountAgeDays,
    accountAgeYears,
    followerRatio,
  };
}

export { GithubWrappedError };

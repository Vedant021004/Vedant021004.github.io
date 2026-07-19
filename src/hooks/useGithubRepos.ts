import { useState, useEffect } from 'react';

export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  size: number;
};

export const useGithubRepos = (user: string) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`
        );
        if (!response.ok) throw new Error("API timeout or rate limit");
        const data = (await response.json()) as Repo[];
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Load failed");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [user]);

  return { repos, loading, error };
};

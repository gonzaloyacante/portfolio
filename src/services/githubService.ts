import { Project } from "@/types";

interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    stargazers_count: number;
    language: string | null;
    updated_at: string;
}

export async function fetchGitHubRepos(username: string = "gonzaloyacante"): Promise<Project[]> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();

        const projects: Project[] = repos
            .filter((repo) => !repo.name.includes("fork"))
            .map((repo) => ({
                id: repo.name,
                title: repo.name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" "),
                short_desc: repo.description || "A project by Gonzalo Yacante",
                url: repo.homepage || repo.html_url,
                github_url: repo.html_url,
                tags: [
                    ...(repo.topics || []),
                    ...(repo.language ? [repo.language] : []),
                ].slice(0, 5),
            }));

        return projects;
    } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        return [];
    }
}

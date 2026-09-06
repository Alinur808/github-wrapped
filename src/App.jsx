import { useState } from "react";
import UsernameForm from "./components/UsernameForm";
import StoryViewer from "./components/StoryViewer";
import { fetchGithubWrapped, GithubWrappedError } from "./api/github";
import { computeArchetype } from "./utils/archetype";
import "./App.css";

export default function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [archetype, setArchetype] = useState(null);

  const handleSubmit = async (username) => {
    setStatus("loading");
    setError(null);
    try {
      const wrapped = await fetchGithubWrapped(username);
      setStats(wrapped);
      setArchetype(computeArchetype(wrapped));
      setStatus("ready");
    } catch (err) {
      const message = err instanceof GithubWrappedError ? err.message : "Something went wrong. Try again.";
      setError(message);
      setStatus("error");
    }
  };

  const handleRestart = () => {
    setStatus("idle");
    setStats(null);
    setArchetype(null);
    setError(null);
  };

  if (status === "ready" && stats && archetype) {
    return <StoryViewer stats={stats} archetype={archetype} onRestart={handleRestart} />;
  }

  return (
    <UsernameForm
      onSubmit={handleSubmit}
      isLoading={status === "loading"}
      error={status === "error" ? error : null}
    />
  );
}

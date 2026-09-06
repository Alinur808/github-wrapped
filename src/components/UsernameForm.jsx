import { useState } from "react";

export default function UsernameForm({ onSubmit, isLoading, error }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <div className="landing">
      <div className="landing__glow" />
      <div className="landing__card">
        <p className="eyebrow">🎉 GitHub Wrapped</p>
        <h1 className="landing__title">What's your GitHub personality?</h1>
        <p className="landing__subtitle">
          Type any public GitHub username and get your own Spotify-Wrapped-style recap —
          stats, vibes, and a shareable card.
        </p>

        <form onSubmit={handleSubmit} className="landing__form">
          <input
            type="text"
            placeholder="e.g. torvalds"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn--primary" disabled={isLoading}>
            {isLoading ? "Wrapping..." : "Wrap me 🎁"}
          </button>
        </form>

        {error && <p className="landing__error">{error}</p>}

        <p className="landing__note">
          Runs entirely in your browser — calls the public GitHub API directly, no backend, no login.
        </p>
      </div>
    </div>
  );
}

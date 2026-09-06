import { formatNumber } from "../utils/format";

export default function TopRepoSlide({ stats }) {
  const { mostStarredRepo } = stats;

  if (!mostStarredRepo || mostStarredRepo.stargazers_count === 0) {
    return (
      <div className="slide-content slide-content--center">
        <p className="eyebrow">Star of the show</p>
        <h1 className="headline">No stars yet</h1>
        <p className="subtext">Your best work is still flying under the radar. The world isn't ready.</p>
      </div>
    );
  }

  return (
    <div className="slide-content slide-content--center">
      <p className="eyebrow">Your most-starred repo</p>
      <h1 className="headline">{mostStarredRepo.name}</h1>
      {mostStarredRepo.description && <p className="subtext">"{mostStarredRepo.description}"</p>}

      <div className="stat-row">
        <div className="stat-pill">
          <span className="stat-pill__value">{formatNumber(mostStarredRepo.stargazers_count)}</span>
          <span className="stat-pill__label">stars ⭐</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill__value">{formatNumber(mostStarredRepo.forks_count)}</span>
          <span className="stat-pill__label">forks 🍴</span>
        </div>
      </div>
    </div>
  );
}

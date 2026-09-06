import { formatNumber } from "../utils/format";

export default function RepoStatsSlide({ stats }) {
  const { ownRepoCount, forkedRepoCount, totalStars } = stats;

  return (
    <div className="slide-content slide-content--center">
      <p className="eyebrow">Shipped</p>
      <h1 className="headline headline--big">{formatNumber(ownRepoCount)}</h1>
      <p className="subtext">public repos of your own{forkedRepoCount > 0 ? ` (plus ${forkedRepoCount} forked)` : ""}.</p>

      <div className="stat-row">
        <div className="stat-pill">
          <span className="stat-pill__value">{formatNumber(totalStars)}</span>
          <span className="stat-pill__label">total stars ⭐</span>
        </div>
      </div>
    </div>
  );
}

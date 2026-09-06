import { formatNumber, formatRatio } from "../utils/format";

function ratioComment(ratio, followers) {
  if (followers === 0) return "A blank slate. Every legend starts at zero.";
  if (ratio >= 5) return "You follow almost no one but everyone follows you. Certified clout.";
  if (ratio >= 1.5) return "Solid ratio. You're giving main-character energy.";
  if (ratio >= 0.5) return "A balanced follower diet. Very reasonable of you.";
  return "You follow way more than follow you back. We don't judge (much).";
}

export default function FollowersSlide({ stats }) {
  const { user, followerRatio } = stats;

  return (
    <div className="slide-content slide-content--center">
      <p className="eyebrow">The social stats</p>
      <div className="stat-row">
        <div className="stat-pill">
          <span className="stat-pill__value">{formatNumber(user.followers)}</span>
          <span className="stat-pill__label">followers</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill__value">{formatNumber(user.following)}</span>
          <span className="stat-pill__label">following</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill__value">{formatRatio(followerRatio)}</span>
          <span className="stat-pill__label">ratio</span>
        </div>
      </div>
      <p className="subtext">{ratioComment(followerRatio, user.followers)}</p>
    </div>
  );
}

import { formatNumber } from "../utils/format";

export default function AccountAgeSlide({ stats }) {
  const { accountAgeDays, accountAgeYears, createdAt } = stats;
  const joinYear = createdAt.getFullYear();

  return (
    <div className="slide-content slide-content--center">
      <p className="eyebrow">Since {joinYear}</p>
      <h1 className="headline headline--big">{formatNumber(accountAgeDays)}</h1>
      <p className="subtext">days on GitHub — that's {accountAgeYears} year{accountAgeYears === 1 ? "" : "s"} of commits, merge conflicts, and 2am "fix typo" pushes.</p>
    </div>
  );
}

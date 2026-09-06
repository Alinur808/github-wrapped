export default function IntroSlide({ stats }) {
  const { user } = stats;
  return (
    <div className="slide-content slide-content--center">
      <img className="avatar" src={user.avatar_url} alt={`${user.login}'s avatar`} />
      <p className="eyebrow">Your GitHub Wrapped</p>
      <h1 className="headline">@{user.login}</h1>
      {user.bio && <p className="subtext">"{user.bio}"</p>}
      <p className="hint">tap or press → to see your year in code</p>
    </div>
  );
}

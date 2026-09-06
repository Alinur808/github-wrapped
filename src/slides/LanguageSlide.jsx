export default function LanguageSlide({ stats }) {
  const { languages } = stats;
  const top = languages.slice(0, 5);

  if (top.length === 0) {
    return (
      <div className="slide-content slide-content--center">
        <p className="eyebrow">Language DNA</p>
        <h1 className="headline">No detected language?!</h1>
        <p className="subtext">Either every repo is a mystery, or you really love plain text files.</p>
      </div>
    );
  }

  return (
    <div className="slide-content">
      <p className="eyebrow">Your language DNA</p>
      <h1 className="headline">{top[0].language}</h1>
      <p className="subtext">is your #1 — showing up in {top[0].percent}% of your repos.</p>

      <div className="language-bars">
        {top.map(({ language, percent }) => (
          <div key={language} className="language-bar">
            <div className="language-bar__label">
              <span>{language}</span>
              <span>{percent}%</span>
            </div>
            <div className="language-bar__track">
              <div className="language-bar__fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

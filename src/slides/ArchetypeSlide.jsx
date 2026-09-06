import { forwardRef, useEffect } from "react";
import confetti from "canvas-confetti";

const ArchetypeSlide = forwardRef(function ArchetypeSlide({ stats, archetype }, cardRef) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="slide-content slide-content--center">
      <p className="eyebrow">Your GitHub personality is...</p>
      <div className="archetype-card" ref={cardRef}>
        <span className="archetype-card__emoji">{archetype.emoji}</span>
        <h1 className="headline">{archetype.title}</h1>
        <p className="subtext">{archetype.description}</p>
        <p className="archetype-card__handle">@{stats.user.login} · GitHub Wrapped</p>
      </div>
    </div>
  );
});

export default ArchetypeSlide;

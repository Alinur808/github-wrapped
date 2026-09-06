export default function ProgressBar({ total, currentIndex }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }).map((_, index) => (
        <div key={index} className="progress-bar__segment">
          <div
            className="progress-bar__fill"
            style={{ width: index < currentIndex ? "100%" : index === currentIndex ? "100%" : "0%" }}
          />
        </div>
      ))}
    </div>
  );
}

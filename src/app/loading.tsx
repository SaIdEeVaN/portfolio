export default function Loading() {
  return (
    <div className="shell" style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
      <div className="loader__card" role="status" aria-live="polite">
        <p className="eyebrow eyebrow--path">loading ~/portfolio</p>
        <p className="loader__name">
          <span>Preparing</span>
          <span>content</span>
        </p>
        <div className="loader__bar" aria-hidden="true">
          <span className="loader__fill" />
        </div>
        <p className="loader__status">Just a moment</p>
      </div>
    </div>
  );
}

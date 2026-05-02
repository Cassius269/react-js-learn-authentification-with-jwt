function Loading({ isLarge = false }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: 500 }}
    >
      <div
        className={`spinner-border text-warning`}
        role="status"
        style={{ width: isLarge ? 100 : "", height: isLarge ? 100 : "" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;

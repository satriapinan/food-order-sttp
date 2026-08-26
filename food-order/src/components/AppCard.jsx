const AppCard = ({ title, subtitle, children, style = {}, contentStyle = {} }) => {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.9)",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(37, 99, 235, 0.12)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        padding: "24px",
        ...style,
      }}
    >
      {(title || subtitle) && (
        <div style={{ marginBottom: "18px" }}>
          {title && (
            <h3 style={{ margin: 0, color: "#1e3a8a", fontSize: "1.4rem" }}>{title}</h3>
          )}
          {subtitle && (
            <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "0.95rem" }}>{subtitle}</p>
          )}
        </div>
      )}

      <div style={{ ...contentStyle }}>{children}</div>
    </div>
  );
};

export default AppCard;

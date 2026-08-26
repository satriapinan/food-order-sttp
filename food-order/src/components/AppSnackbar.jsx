const AppSnackbar = ({ message, visible = false, type = "success" }) => {
  if (!visible || !message) return null;

  const palette = {
    success: {
      background: "#dcfce7",
      color: "#166534",
      border: "#86efac",
    },
    error: {
      background: "#fee2e2",
      color: "#b91c1c",
      border: "#fca5a5",
    },
    info: {
      background: "#dbeafe",
      color: "#1d4ed8",
      border: "#93c5fd",
    },
  };

  const style = palette[type] || palette.success;

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "10px 14px",
        borderRadius: "10px",
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
};

export default AppSnackbar;

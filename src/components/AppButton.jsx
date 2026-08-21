import React from "react";

export default function AppButton({
  label,
  onClick,
  variant = "primary",
  type = "button",
  style = {},
}) {
  const variants = {
    primary: {
      background: "#f97316",
      color: "#fff",
      border: "none",
    },
    secondary: {
      background: "#fff",
      color: "#111827",
      border: "1px solid #e5e7eb",
    },
    dark: {
      background: "#111827",
      color: "#fff",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...styles.button,
        ...variants[variant],
        ...style,
      }}
    >
      {label}
    </button>
  );
}

const styles = {
  button: {
    borderRadius: "12px",
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};
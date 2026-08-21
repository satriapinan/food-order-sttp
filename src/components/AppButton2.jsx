import React from "react";

export default function AppButton2({
  label,
  onClick,
  variant = "primary",
  type = "button",
  size = "md",
  disabled = false,
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
    ghost: {
      background: "transparent",
      color: "#f97316",
      border: "1px solid #fdba74",
    },
  };

  const sizes = {
    sm: {
      padding: "8px 12px",
      fontSize: "12px",
    },
    md: {
      padding: "12px 18px",
      fontSize: "14px",
    },
    lg: {
      padding: "14px 22px",
      fontSize: "16px",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        ...variants[variant],
        ...sizes[size],
        ...style,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

const styles = {
  button: {
    borderRadius: "12px",
    fontWeight: 700,
    transition: "all 0.2s ease",
  },
};
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import useTheme from "./hooks/useTheme";

const AppLayout = ({ title, children, actions }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const palette = isDark
    ? {
        pageBg: "linear-gradient(135deg, #0f172a 0%, #111827 52%, #1e293b 100%)",
        text: "#e2e8f0",
        headerBg: "rgba(15, 23, 42, 0.82)",
        cardBg: "rgba(30, 41, 59, 0.8)",
        accent: "#93c5fd",
        actionBg: "#1d4ed8",
        actionText: "#eff6ff",
      }
    : {
        pageBg: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 45%, #eff6ff 100%)",
        text: "#0f172a",
        headerBg: "rgba(255, 255, 255, 0.7)",
        cardBg: "rgba(255,255,255,0.5)",
        accent: "#1d4ed8",
        actionBg: "#e0e7ff",
        actionText: "#1e3a8a",
      };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: palette.pageBg,
        fontFamily: "Arial, sans-serif",
        color: palette.text,
        padding: "32px 20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            padding: "18px 22px",
            borderRadius: "18px",
            background: palette.headerBg,
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.12)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.8rem", color: palette.accent }}>
            {title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {actions && actions}

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                style={{
                  border: "none",
                  background: "#ef4444",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span aria-hidden="true">🚪</span>
                Logout
              </button>
            )}

            <button
              type="button"
              onClick={toggleTheme}
              style={{
                border: "none",
                background: palette.actionBg,
                color: palette.actionText,
                padding: "10px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </header>

        <main
          style={{
            background: palette.cardBg,
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 12px 35px rgba(59, 130, 246, 0.1)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// 1. Import Provider yang sudah kamu buat sebelumnya
// (Pastikan nama file dan foldernya sesuai dengan yang ada di VS Code kamu)
import { AuthProvider } from "./providers/AuthContext.jsx";
import { ThemeProvider } from "./providers/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Bungkus App dengan Provider agar data user dan tema bisa dibaca di semua halaman */}
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

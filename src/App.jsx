import { Routes, Route } from "react-router";
import ExamplePage from "./pages/Example";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";


function App() {
  return(
<Routes>
  <Route index element={<ExamplePage />} />
  <Route path="login" element={<LoginPage />} />
  <Route path="register" element={<RegisterPage />} />
  <Route path="example" element={<ExamplePage />} />
  <Route path="example/:value" element={<ExamplePage />} />
</Routes>
  );
}
export default App;

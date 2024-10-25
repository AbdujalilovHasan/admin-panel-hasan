import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DasboardPage from "./pages/DasboardPage";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage"; 
import NotFoundPage from "./pages/NotFoundPage";
import useAuthContext from "./hooks/useAuthContext";
import AdminLayout from "./components/AdminLayout";

function App() {
  const { isLogin } = useAuthContext();

  return (
    <div style={{maxWidth: '1600px', width: '100%', margin: '0 auto'}} className="container">
      <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        {isLogin ? (
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DasboardPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="teachers/:teacherId" element={<StudentsPage />} />
            <Route path="students" element={<StudentsPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
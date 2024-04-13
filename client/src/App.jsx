import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './middleware/authContext';
import LoginPage from './pages/login';
import BoardPage from './pages/dashboard';
import ProtectedRoute from './routes/protectedRoute';
import AuthCheck from './middleware/authCheck';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AuthCheck>
                  <BoardPage />
                </AuthCheck>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <AuthCheck>
                <Navigate to="/dashboard" replace />
              </AuthCheck>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './middleware/authContext';
// import isAuthenticated from './middleware/isAuthenticated';
import LoginPage from './pages/login';
import BoardPage from './pages/dashboard';
import ProtectedRoute from './routes/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<BoardPage />} />
            </Route>
            {/* <Route
              path="/"
              element={
                isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

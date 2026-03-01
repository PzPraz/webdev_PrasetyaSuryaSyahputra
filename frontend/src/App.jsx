import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import FormList from './pages/forms/FormList.jsx'
import FormDetail from './pages/forms/FormDetail.jsx'
import RespondForm from './pages/respondent/RespondForm.jsx'
import SubmitSuccess from './pages/respondent/SubmitSuccess.jsx'
import ExploreForms from './pages/forms/ExploreForms.jsx'
import { getToken } from './lib/api.js'

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = !!getToken()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Redirect to /forms if logged in, otherwise show Home
function HomeOrForms() {
  const isAuthenticated = !!getToken()
  return isAuthenticated ? <Navigate to="/forms" replace /> : <Home />
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomeOrForms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<ExploreForms />} />
            <Route
              path="/forms"
              element={
                <ProtectedRoute>
                  <FormList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forms/:id"
              element={
                <ProtectedRoute>
                  <FormDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/respond/:id" element={<RespondForm />} />
            <Route path="/respond/:id/success" element={<SubmitSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

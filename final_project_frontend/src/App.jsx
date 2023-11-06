import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import UserProfile from './components/UserProfile'
import './App.css'
import LogoutPage from './pages/LogOutPage'
import ErrorPage from './pages/ErrorPage'
import { AuthProvider } from './AuthContext'
import Registration from './pages/Registration'
import WelcomePage from './pages/WelcomePage'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/WelcomePage" element={<WelcomePage/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Logout" element={<LogoutPage />} />
          <Route path="/ErrorPage" element={<ErrorPage/>} />
        </Routes>
      
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

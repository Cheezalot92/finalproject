import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import UserProfile from './components/UserProfile'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/UserProfile" element={<UserProfile/> } />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App

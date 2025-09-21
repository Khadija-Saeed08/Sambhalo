import './App.css'
import Expenses from './components/Expense/Expenses'
import Income from './components/Income/Income'
import Savings from './components/Savings/Savings'
import SideBar from './components/SideBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import FinanceDashboard from './components/Dashboard/FinanceDashboard'
import Login from "./pages/Login"
import Register from "./pages/Register"
import PageNotFound from "./pages/PageNotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import LandingPage from './pages/LandingPage'
import { ACCESS_TOKEN } from './constants'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'



function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem(ACCESS_TOKEN));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (

      <div className={isLoggedIn ? "with-sidebar" : "no-sidebar"}>
  {isLoggedIn && <SideBar />}
  <div className={`main-content ${location.pathname === "/Sambhalo" ? "no-padding" : ""}`}>
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          
          <div >
            <Routes>
              <Route path="/" element={<ProtectedRoute> <FinanceDashboard /> </ProtectedRoute>} />
              <Route path="/new-expense" element={<ProtectedRoute> <Expenses /> </ProtectedRoute>} />
              <Route path="/income" element={<ProtectedRoute> <Income /> </ProtectedRoute>} />
              <Route path="/Savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />

               <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
               <Route path="/Sambhalo" element={<LandingPage/>}></Route>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </div>
        </div>
      </div>

  )
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  )
}

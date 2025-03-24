import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import SignIn from './components/LogIn';
import About from './components/About';
import Test from './components/DataTest';
import AdminDashboard from './components/AdminDashboard';
import AdminDataManager from './components/AdminDataManager';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './contexts/UserContext';
import { DataProvider } from './contexts/DataContext';
import './css/App.css';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <div className="app">
            <MainHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/about" element={<About />} />
              <Route path="/test" element={<Test />} />
              <Route path="/user" element={<UserDashboard />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/data-manager" 
                element={
                  <ProtectedRoute>
                    <AdminDataManager />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </UserProvider>
  );
}

export default App;

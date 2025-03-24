import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/common/MainHeader';
import Navigation from './components/common/Navigation';
import HomePage from './components/pages/HomePage';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/LogIn';
import About from './components/pages/About';
import Test from './components/data/DataTest';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminDataManager from './components/admin/AdminDataManager';
import ProtectedRoute from './components/common/ProtectedRoute';
import { UserProvider } from './contexts/UserContext';
import { DataProvider } from './contexts/DataContext';
import './css/App.css';
import Footer from './components/common/Footer';
import UserDashboard from './components/user/UserDashboard';
import AdminDataViewer from './components/admin/AdminDataViewer';
import LoginAuth from './components/auth/LoginAuth';

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
              <Route path="/signin" element={<LoginAuth />} />
              <Route path="/about" element={<About />} />
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
                path="/admin/data-viewer" 
                element={
                  <ProtectedRoute>
                    <AdminDataViewer />
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

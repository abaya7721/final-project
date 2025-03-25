import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/common/MainHeader';
import Navigation from './components/common/Navigation';
import HomePage from './components/pages/HomePage';
import About from './components/pages/About';
import Test from './components/data/DataTest';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminDataManager from './components/admin/AdminDataManager';
import ProtectedRoute from './components/common/ProtectedRoute';
import { DataProvider } from './contexts/DataContext';
import './css/App.css';
import Footer from './components/common/Footer';
import UserDashboard from './components/user/UserDashboard';
import AdminDataViewer from './components/admin/AdminDataViewer';
import LoginAuth from './components/auth/LoginAuth';
import { UserAuthProvider } from './contexts/UserAuthContext';
import SignUpAuth from './components/auth/SignUpAuth';

// Separate component for the app content
const AppContent = () => {
  return (
    <UserAuthProvider>
      <DataProvider>
        <Router>
          <div className="app">
            <MainHeader />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpAuth />} />
              <Route path="/signin" element={<LoginAuth />} />
              <Route path="/about" element={<About />} />
              
              {/* User routes */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute requiredRole="ROLE_USER">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="ROLE_ADMIN">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/data-manager" 
                element={
                  <ProtectedRoute requiredRole="ROLE_ADMIN">
                    <AdminDataManager />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/data-viewer" 
                element={
                  <ProtectedRoute requiredRole="ROLE_ADMIN">
                    <AdminDataViewer />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </UserAuthProvider>
  );
};

export default AppContent;

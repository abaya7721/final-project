import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import SignIn from './components/LogIn';
import About from './components/About';
import Test from './components/DataTest';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="page-logo">
        <img src="/rally-data-logo.PNG" alt="Rally Data Logo" />
      </div>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

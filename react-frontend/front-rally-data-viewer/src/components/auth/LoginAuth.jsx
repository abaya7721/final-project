import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/UserAuthContext";
import "../../css/App.css";

export default function LoginAuth() {
    const navigate = useNavigate();
    const { login, error, loading, user } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('key');
        if (token && user) {
            console.log('User already logged in, redirecting');
            navigate('/user');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Attempting login with username:', username);
        
        const success = await login(username, password);
        console.log('Login result:', success ? 'Success' : 'Failed');
        
        if (success) {
            // Verify token was stored
            const token = localStorage.getItem('key');
            console.log('Token after login:', token ? 'Present' : 'Missing');
            
            if (token) {
                console.log('Login successful, navigating to user dashboard');
                navigate('/user');
            } else {
                console.error('Login succeeded but no token stored');
            }
        } else {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-control"
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                            disabled={loading}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
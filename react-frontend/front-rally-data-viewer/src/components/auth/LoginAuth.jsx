import {useState} from "react";
import {login} from "../../utilities/apiUtilities";
import {jwtDecode} from "jwt-decode";
import "../../css/App.css";

export default function LoginAuth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                username: username,
                password: password
            };
            
            const response = await login(payload);
            const claims = jwtDecode(response.token);
            localStorage.setItem('key', response.token);
            localStorage.setItem('role', claims.role[0].authority);
            localStorage.setItem('username', claims.sub);
        } catch (err) {
            setError('Invalid username or password');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
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
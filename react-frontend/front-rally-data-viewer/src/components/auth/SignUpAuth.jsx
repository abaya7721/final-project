import { useState } from 'react';
import { signup } from "../../utilities/apiUtilities";
import { useAuth } from '../../contexts/UserAuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignUpAuth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [signupErrors, setSignupErrors] = useState([]);
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        let errors = [];
        if (!username) {
            errors.push("Please enter a valid username");
        }
        if (!password) {
            errors.push("Please enter a valid password");
        }
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long");
        }
        if (!passwordConfirm) {
            errors.push("Please confirm password");
        }
        if (passwordConfirm !== password) {
            errors.push("Passwords do not match");
        }
        setSignupErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            console.log('Attempting signup with username:', username);
            const signupPayload = {
                username: username,
                password: password,
                role: "ROLE_USER"
            };
            
            console.log('Sending signup payload:', { ...signupPayload, password: '[REDACTED]' });
            const response = await signup(signupPayload);
            console.log('Signup response:', response);
            
            if (response.token) {
                console.log('Signup successful');
                setSignupErrors(['Signup successful! Please log in with your new account.']);
                // Clear the form
                setUsername("");
                setPassword("");
                setPasswordConfirm("");
            } else {
                setSignupErrors(['Signup failed. Please try again.']);
            }
        } catch (err) {
            console.error('Signup error details:', err);
            if (err.response) {
                const errorMessage = err.response.data.message || 
                    `Server error (${err.response.status}): ${JSON.stringify(err.response.data)}`;
                setSignupErrors([errorMessage]);
            } else {
                setSignupErrors(['Failed to connect to the server. Please check your connection and try again.']);
            }
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 className="auth-title-left">Enter Information</h2>
                {signupErrors.length > 0 && (
                    <div className="error-messages">
                        {signupErrors.map((error, index) => (
                            <p key={index} className={error.includes('successful') ? 'success-message' : 'error-message'}>
                                {error}
                            </p>
                        ))}
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group-left">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control-left"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="form-group-left">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control-left"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="form-group-left">
                    <label className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control-left"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
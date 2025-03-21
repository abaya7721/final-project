import React from 'react';

const SignUpButton = () => {
  return (
    <div>
      <div className="auth-buttons">
        <a href="/signup" className="signup-button">Sign Up</a>
        <a href="/signin" className="signin-button">Sign In</a>
      </div>
    </div>
  );
};

export default SignUpButton; 
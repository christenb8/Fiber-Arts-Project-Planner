import React from 'react';
import './login.css';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';

function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login-container">
      <h1> Welcome! </h1>
      <div className="auth-container">
        <div className="auth-section">
          <h2>Login</h2>
          <LoginForm onLoginSuccess={onLoginSuccess} />
        </div>
        <div className="auth-section">
          <h2>Sign Up</h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
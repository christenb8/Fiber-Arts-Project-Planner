import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import '../auth.css';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: {
          username,
          password
        }
      });
      console.log('Logged in:', data);
      // Clear form after successful submission
      setUsername('');
      setPassword('');
      // Call onLoginSuccess with the login response
      if (onLoginSuccess && data.loginUser) {
        // Store the token if needed
        localStorage.setItem('token', data.loginUser.token);
        onLoginSuccess(data.loginUser.user);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className="auth-button">Login</button>
    </form>
  );
}

export default LoginForm;
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import '../auth.css';

const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $password: String!) {
    signupUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signupUser] = useMutation(SIGNUP_USER, {
    refetchQueries: [
      {query: gql`
        query GetUsersList {
          getUsers {
            id
            username
            age
          }
        }
      `}
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupUser({
        variables: {
          username,
          password
        }
      });
      console.log('Signed up:', data.signupUser.user);
      // Clear form after successful submission
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error signing up:', error);
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
      <button type="submit" className="auth-button">Sign Up</button>
    </form>
  );
}

export default SignupForm;
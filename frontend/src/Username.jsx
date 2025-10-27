import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_USERNAME = gql`
  query GetUsername {
    getUsername
  }
`;

function UserGreeting() {
  const { data, loading, error } = useQuery(GET_USERNAME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <h1>Welcome, {data.getUsername}!</h1>;
}

export default UserGreeting;

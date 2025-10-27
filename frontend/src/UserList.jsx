import { gql, useQuery } from "@apollo/client";
import './UserList.css';

const GET_USERS = gql`
  query GetUsersList {
    getUsers {
      id
      username
      age
    }
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Network Error: {error.message}</p>;

  return (
    <div className="user-list">
      <ul>
        {data.getUsers.map((user) => (
          <li key={user.id} className="user-item">
            {user.username} {user.age ? `(${user.age} years old)` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

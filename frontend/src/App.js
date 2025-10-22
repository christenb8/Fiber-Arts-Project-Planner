import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from './UserList';
import AddUserForm from './AddUserForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h2> Users: </h2>
        {/* <UserList /> */}
        <h2> Add a New User: </h2>
        {/* <AddUserForm /> */}
      </header>
    </div>
  );
}

export default App;

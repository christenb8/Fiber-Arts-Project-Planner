import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import UserList from './UserList.jsx';
import ProjectList from './ProjectList.jsx';
import AddProjectForm from './AddProjectForm.js';
import LoginPage from './components/LoginPage/index.js';
import AboutPage from './components/AboutPage/AboutPage.js';
import './components/auth.css';
import { GET_USERNAME } from './Username.jsx';
import { useQuery } from '@apollo/client';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  // const [username, setUsername] = useState(localStorage.getItem('username') || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // setUsername("");
    localStorage.removeItem('token');
    setCurrentPage('login');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { data, loading, error } = useQuery(GET_USERNAME, {
    context: {
      headers: {
        Authorization: "Bearer " + (localStorage.getItem('token') || ''),
      },
    },
    skip: !isAuthenticated, // only run if logged in
  });

  const username = data?.getUsername || "Guest";

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginPage onLoginSuccess={handleLogin} />
      ) : (
        
        <>
          <nav className="app-nav">
            {/* <button 
              className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handlePageChange('home')}
            >
              Home
            </button>
            <button 
              className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => handlePageChange('about')}
            >
              About
            </button> */}
            <button 
              className="nav-button logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>

          {currentPage === 'home' ? (
            <>
              <h1>Welcome, {loading ? "Loading..." : error ? "User" : username}!</h1>
              <p>Keep track of your projects!</p>
          
              <div id="container">
                <div id="users">
                  <h2>Users:</h2>
                  <p>List of users will be displayed here.</p>
                  <UserList />
                </div>
                <div id="add-project">
                  <h2>Add a New Project:</h2>
                  <button className="add-project-button" onClick={handleButtonClick} style={{ marginBottom: '10px' }}>
                    {showForm ? 'Hide Form' : 'Add New Project'}
                  </button>
                  {showForm && <AddProjectForm />}
                </div>
            
              </div>
              <div id="projects"> 
                <h2>Your Projects</h2>
                <div id ="completed-projects">
                  <h3>Completed Projects:</h3>
                  <ProjectList showCompleted={true}/>
                </div>

                <div id = "in-progress-projects">
                  <h3>In-Progress Projects:</h3>
                    <ProjectList showCompleted={false}/>
                </div>
              </div>
            </>
          ) : (
            <AboutPage />
          )}
        </>
      )}
      
    </div>
  );
}

export default App;

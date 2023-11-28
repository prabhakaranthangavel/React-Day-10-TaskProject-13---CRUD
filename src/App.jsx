import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserForm from './components/UserForm';
import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowForm(false);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = () => {
    setShowForm(true);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`)
      .then(response => {
        // Remove the deleted user from the state
        setUsers(users.filter(user => user.id !== selectedUser.id));
        setSelectedUser(null);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleFormSubmit = (userData) => {
    if (selectedUser) {
      // Update existing user
      axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, userData)
        .then(response => {
          const updatedUsers = users.map(user =>
            user.id === selectedUser.id ? { ...user, ...response.data } : user
          );
          setUsers(updatedUsers);
          setSelectedUser(null);
          setShowForm(false);
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      // Add new user
      axios.post('https://jsonplaceholder.typicode.com/users', userData)
        .then(response => {
          setUsers([...users, response.data]);
          setShowForm(false);
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container">
      <UserList users={users} onSelectUser={handleSelectUser} />
      <UserDetails user={selectedUser} />

      <div>
        <button onClick={handleAddUser}>Add User</button>
        {selectedUser && (
          <>
            <button onClick={handleEditUser}>Edit User</button>
            <button className="delete-btn" onClick={handleDeleteUser}>
              Delete User
            </button>
          </>
        )}
      </div>

      {showForm && (
        <UserForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default App;
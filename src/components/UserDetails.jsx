import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [user]);

  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>

          <h4>Posts</h4>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
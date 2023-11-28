import React, { useState } from 'react';

const UserForm = ({ onSubmit, onCancel, user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const handleSubmit = () => {
    onSubmit({ name, email });
  };

  return (
    <div>
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <form>
      <div>
        <label>Name:</label> &nbsp;
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> &nbsp; &nbsp;
        <label>Email:</label> &nbsp;
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <><br />
        <button type="button" className="upa" onClick={handleSubmit}>
          {user ? 'Update' : 'Add'}
        </button> &nbsp;
        <button type="button" className="upa" onClick={onCancel}>Cancel</button>
        </>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
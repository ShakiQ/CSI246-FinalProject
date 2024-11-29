import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('User');
  const [newName, setNewName] = useState('');

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/');
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    if (newName.trim() === '') {
      alert('Name cannot be empty');
      return;
    }
    setName(newName);
    setNewName('');
    alert('Name updated successfully!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Settings</h1>
      <h2>Welcome, {name}</h2>
      <form onSubmit={handleNameChange} style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter new name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '80%',
            maxWidth: '300px',
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28A745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save Name
        </button>
      </form>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#DC3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;

import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const userName = 'User'; 

  const handleLogout = () => {
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome {userName} to your wall</h1>
      <div style={{ margin: '20px 0' }}>
        <button
          onClick={() => navigate('/browser-feature')}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Address and Location
        </button>
        <button
          onClick={() => navigate('/camera')}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#28A745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Camera
        </button>
        <button
          onClick={() => navigate('/settings')}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#FFC107',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Settings
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#DC3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;

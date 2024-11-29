import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response);
    navigate('/profile');
  };

  const handleGoogleError = (error) => {
    console.error('Google Login Failed:', error);
  };

  const handleUsernamePasswordLogin = (event) => {
    event.preventDefault();
    if (username === 'user' && password === 'userPass') {
      console.log('Username/Password Login Successful');
      navigate('/profile');
    } else {
      console.error('Invalid username or password');
    }
  };


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login to Your Account</h1>

      {/* Google Login */}
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div style={{ marginBottom: '20px' }}>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>
      </GoogleOAuthProvider>

      {/* Username/Password Login */}
      <form onSubmit={handleUsernamePasswordLogin} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', width: '200px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '200px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

    </div>
  );
};

export default Login;

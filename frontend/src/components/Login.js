import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`https://backend-psi-black-59.vercel.app${endpoint}`, {
        username,
        password
      });

      console.log(response);
      
      
      onLogin(response.data.token, response.data.username);
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>DSA Sheet Tracker</h2>
        <h3>{isLogin ? 'Login' : 'Register'}</h3>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="error">{error}</p>}
          
          <button type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} className="link">
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
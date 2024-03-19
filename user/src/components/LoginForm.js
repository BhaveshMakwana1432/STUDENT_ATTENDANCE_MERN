import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      console.log('Login successful:', response.data);
      // Store token in local storage or session storage
      localStorage.setItem('token', response.data.token);
      // Redirect user to dashboard after successful login
      history.push('/');
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle login error
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;

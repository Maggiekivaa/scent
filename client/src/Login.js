import React from 'react';
import { useFormik } from 'formik';
import { useAuth } from './context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // 👈 Add Link

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate('/');
      } catch (error) {
        alert('Invalid login');
      }
    },
  });

  return (
    <div className='login-container'>
      <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2>
        <input
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <Link to="/signup">Sign up here</Link> {/* 👈 Signup link */}
      </p>
    </div>
  );
}

export default Login;

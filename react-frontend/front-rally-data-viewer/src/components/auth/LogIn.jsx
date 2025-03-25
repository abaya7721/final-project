// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../contexts/UserContext';

// const SignIn = () => {
//   const navigate = useNavigate();
//   const { validateLogin, error } = useUser();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const success = await validateLogin(formData.username, formData.password);
//       if (success) {
//         console.log('Login successful');
//         navigate('/'); // Redirect to home page after successful login
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>Welcome Back</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username / Email</label>
//             <input
//               type="email"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="form-control"
//             />
//           </div>
//           {error && <div className="error-message">{error}</div>}
//           <button 
//             type="submit" 
//             className="submit-button"
//             disabled={loading}
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
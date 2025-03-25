// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUser } from '../../contexts/UserContext';
// import { useScrollToComponent } from '../../hooks/useScrollToComponent';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const { registerUser, error } = useUser();
//   const componentRef = useScrollToComponent();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const success = await registerUser({
//         username: formData.username,
//         password: formData.password
//       });

//       if (success) {
//         console.log('Registration successful');
//         navigate('/signin'); // Redirect to sign in page after successful registration
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div ref={componentRef} className="auth-container">
//       <div className="auth-form">
//         <h2>Create Account</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Email</label>
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
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
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
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
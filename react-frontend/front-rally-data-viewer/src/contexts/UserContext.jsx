// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const guest = {
//         username: "admin@email.com",
//         password: "password",
//         authenticated: true,
//         authority: "ADMIN",
//     };

//     const [user, setUser] = useState(guest);
//     const [error, setError] = useState(null);

//     const validateLogin = async (username, password) => {
//         try {
//             console.log('Attempting login for user:', username);
            
//             const response = await fetch("http://localhost:8080/api/users/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ username, password })
//             });

//             console.log('Login response status:', response.status);

//             if (response.ok) {
//                 const userData = await response.json();
//                 console.log('Login successful, user data received:', userData);
                
//                 setUser({
//                     username: userData.username,
//                     authenticated: true,
//                     authority: userData.authority || "USER",
//                     password: "" // Clear password for security
//                 });
//                 setError(null);
//                 return true;
//             } else {
//                 const errorData = await response.json();
//                 console.error("Authentication failed:", errorData);
//                 setUser(guest);
//                 setError(errorData.message || "Login failed. Please check your credentials.");
//                 return false;
//             }
//         } catch (error) {
//             console.error("Error during login:", error);
//             setUser(guest);
//             setError("Network error. Please try again later.");
//             return false;
//         }
//     };

//     const registerUser = async (userData) => {
//         try {
//             const response = await fetch("http://localhost:8080/api/auth/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(userData)
//             });

//             if (response.ok) {
//                 const newUser = await response.json();
//                 console.log('Registration successful:', newUser);
//                 setError(null);
//                 return true;
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message || "Registration failed. Please try again.");
//                 return false;
//             }
//         } catch (error) {
//             console.error("Error during registration:", error);
//             setError("Network error. Please try again later.");
//             return false;
//         }
//     };

//     const logout = () => {
//         console.log('Logging out user:', user.username);
//         setUser(guest);
//         setError(null);
//     };

//     const updateUserProfile = async (profileData) => {
//         try {
//             const response = await fetch(`http://localhost:8080/api/users/${user.username}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(profileData)
//             });

//             if (response.ok) {
//                 const updatedUser = await response.json();
//                 setUser({
//                     ...user,
//                     ...updatedUser,
//                     password: "" // Ensure password remains cleared
//                 });
//                 setError(null);
//                 return true;
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message || "Profile update failed.");
//                 return false;
//             }
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             setError("Network error. Please try again later.");
//             return false;
//         }
//     };

//     return (
//         <UserContext.Provider value={{ 
//             user, 
//             error,
//             validateLogin, 
//             logout,
//             registerUser,
//             updateUserProfile
//         }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Custom hook for using the UserContext
// export const useUser = () => {
//     const context = React.useContext(UserContext);
//     if (context === undefined) {
//         throw new Error('useUser must be used within a UserProvider');
//     }
//     return context;
// };
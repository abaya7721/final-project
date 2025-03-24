// package com.app.rally.authentication.services;


// import com.app.rally.authentication.data.UserNew;
// import com.app.rally.authentication.data.UserRepositoryNew;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;


// @Service
// public class UserService {
//     @Autowired
//     private final UserRepositoryNew userRepository;

//     /* TODO Make sure doesn't exist */

//     public UserService(UserRepositoryNew userRepository) {
//         this.userRepository = userRepository;
//     }

//     public UserDetailsService userDetailsService() {
//         return new UserDetailsService() {
//             @Override
//             public UserDetails loadUserByUsername(String username) {
//                 try{
//                     return userRepository.findByUsername(username);
//                 }
//                 catch(Exception e) {
//                    throw new UsernameNotFoundException("User not found");
//                 }

//             }
//         };
//     }

//     public UserNew save(UserNew newUser) {
//         return userRepository.save(newUser);
//     }

// }
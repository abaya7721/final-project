package com.app.rally.robustauthentication.services;


import com.app.rally.robustauthentication.data.model.User;
import com.app.rally.robustauthentication.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                try{
                    return userRepository.findByUsername(username);
                }
                catch(Exception e) {
                   throw new UsernameNotFoundException("User not found");
                }

            }
        };
    }

    public User save(User newUser) {
        return userRepository.save(newUser);
    }

}
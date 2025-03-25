package com.app.rally.robustauthentication.controller;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.rally.robustauthentication.data.model.User;
import com.app.rally.robustauthentication.data.repository.UserRepository;
import com.app.rally.robustauthentication.dto.JwtAuthenticationResponse;
import com.app.rally.robustauthentication.dto.SignInRequest;
import com.app.rally.robustauthentication.services.AuthenticationService;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController implements Serializable {
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationService authenticationService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping()
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN','ROLE_USER)")
    @GetMapping("/me")
    public User getThisUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)principal).getUsername();
        return userRepository.findByUsername(username);
    }

    @PostMapping("/login")
    public JwtAuthenticationResponse signin(@RequestBody SignInRequest request) {
        return authenticationService.signin(request);
    }

    @PostMapping("/signup")
    public JwtAuthenticationResponse signup(@RequestBody SignInRequest request) {
        return authenticationService.signup(request);
    }

}

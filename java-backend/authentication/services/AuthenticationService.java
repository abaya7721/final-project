package com.app.rally.authentication.services;

import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.rally.authentication.data.Role;
import com.app.rally.authentication.data.UserNew;
import com.app.rally.authentication.data.UserRepositoryNew;
import com.app.rally.authentication.dto.JwtAuthenticationResponse;
import com.app.rally.authentication.dto.SignInRequest;


@Service
public class AuthenticationService {
    private final UserRepositoryNew userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepositoryNew userRepository, UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public JwtAuthenticationResponse signup(SignInRequest request) {
        UserNew user = new UserNew(UUID.randomUUID(), request.getUsername(), passwordEncoder.encode(request.getPassword()), true,  Role.ROLE_USER);
        user = userService.save(user);
        String jwt = jwtService.generateToken(user);

        return  new JwtAuthenticationResponse(jwt);
    }


    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserNew user = userRepository.findByUsername(request.getUsername());
        String jwt = jwtService.generateToken(user);

        return  new JwtAuthenticationResponse(jwt);
    }

}
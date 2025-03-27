package com.app.rally.robustauthentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.app.rally.robustauthentication.data.model.Role;
import com.app.rally.robustauthentication.data.model.User;
import com.app.rally.robustauthentication.data.repository.UserRepository;
import com.app.rally.robustauthentication.dto.JwtAuthenticationResponse;
import com.app.rally.robustauthentication.dto.SignInRequest;
import com.app.rally.robustauthentication.services.AuthenticationService;
import com.app.rally.robustauthentication.services.JwtService;
import com.app.rally.robustauthentication.services.UserService;

@TestConfiguration
class TestConfig {
    @Bean
    @Primary
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }
}

@SpringBootTest(properties = {
    "spring.main.allow-bean-definition-overriding=true",
    "spring.jpa.hibernate.ddl-auto=none"
})
@ComponentScan(basePackages = "com.app.rally.robustauthentication")
@Import(TestConfig.class)
class AuthenticationTests {

    @Autowired
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private UserDetailsService userDetailsService;

    private User testUser;
    private SignInRequest signInRequest;
    private String testToken;

    @BeforeEach
    void setUp() {
        // Create test user
        testUser = new User(UUID.randomUUID(), "test2@example.com", "password", true, Role.ROLE_USER);

        // Create sign-in request
        signInRequest = new SignInRequest();
        signInRequest.setUsername("test2@example.com");
        signInRequest.setPassword("password");

        // Create test token
        testToken = "test.jwt.token";

        // Setup UserDetailsService mock
        UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(testUser.getUsername())
            .password(testUser.getPassword())
            .roles("ROLE_USER")
            .build();
        
        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(userDetails);
        when(userService.userDetailsService().loadUserByUsername(anyString())).thenReturn(userDetails);
    }

    @Test
    void testSignInSuccess() {
        // Mock authentication
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(null);
        
        // Mock user repository
        when(userRepository.findByUsername(anyString())).thenReturn(testUser);
        
        // Mock JWT token generation
        when(jwtService.generateToken(any(UserDetails.class))).thenReturn(testToken);

        // Test signin
        JwtAuthenticationResponse response = authenticationService.signin(signInRequest);
        
        // Verify response
        assertNotNull(response);
        assertEquals(testToken, response.getToken());

        // Verify interactions
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findByUsername(testUser.getUsername());
        verify(jwtService).generateToken(any(UserDetails.class));
    }
} 
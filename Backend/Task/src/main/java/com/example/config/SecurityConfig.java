/*package com.example.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for H2 console
            .headers(headers -> headers.frameOptions().disable()) // Allow H2 console frames
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll() // Allow H2 console without authentication
                .anyRequest().authenticated()
            )
            .formLogin(login -> login.defaultSuccessUrl("/h2-console", true)) // Redirect after login
            .logout(logout -> logout.logoutSuccessUrl("/h2-console")); // Logout goes to H2 console

        return http.build();
    }
}
*/
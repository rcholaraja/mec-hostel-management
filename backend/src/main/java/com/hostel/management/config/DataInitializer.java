package com.hostel.management.config;

import com.hostel.management.entity.User;
import com.hostel.management.enums.UserRole;
import com.hostel.management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUser("warden", "warden123", UserRole.WARDEN);
        seedUser("student", "student123", UserRole.STUDENT);
    }

    private void seedUser(String username, String rawPassword, UserRole role) {
        if (!userRepository.existsByUsername(username)) {
            User user = User.builder()
                    .username(username)
                    .password(passwordEncoder.encode(rawPassword))
                    .role(role)
                    .build();
            userRepository.save(user);
            log.info("Seeded default {} account → username: '{}', password: '{}'", role, username, rawPassword);
        } else {
            log.info("Default {} account '{}' already exists, skipping seed.", role, username);
        }
    }
}

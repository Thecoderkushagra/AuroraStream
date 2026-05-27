package com.TheCoderKushagra.security;

import com.TheCoderKushagra.entity.User;
import com.TheCoderKushagra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserAuthentication implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(username);
        User user;
        if (byUsername.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        } else {
            user = byUsername.get();
        }
        return user;
    }
}

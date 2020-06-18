package com.webapp.movieswebapp.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void deleteUser(SiteUser siteUser){
        userRepository.delete(siteUser);
    }
    public void signUpUser(SiteUser siteUser){
        siteUser.setPassword(passwordEncoder.encode(siteUser.getPassword()));
        userRepository.save(siteUser);
    }
    public boolean signInUser(SiteUser siteUser){
        return userRepository.equals(siteUser);
    }
}

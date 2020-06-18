package com.webapp.movieswebapp.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserService service;
    /**WARNING!!!
     * We are building a API.
     * This is the controller part of the User entity.
     * If wou return the index or the the sing in you are actually
     * handling the web page this is not what we want **/
    @PostMapping("/signUp")
    private String signUpUser(@RequestBody SiteUser siteUser){
        service.signUpUser(siteUser);
        return "ok";
    }
    @PostMapping("/signIn")
    private boolean signInUser(@RequestBody SiteUser siteUser){
        return service.signInUser(siteUser);
    }
    @DeleteMapping("/User")
    private String deleteUser(@RequestBody SiteUser siteUser){
        service.deleteUser(siteUser);
        return "success delete";
    }

}

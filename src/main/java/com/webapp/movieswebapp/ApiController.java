package com.webapp.movieswebapp;

import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {

    @GetMapping("/name")
    private String name(){
        return "bill";
    }

}

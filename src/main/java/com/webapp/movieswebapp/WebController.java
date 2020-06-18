package com.webapp.movieswebapp;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WebController {

    /**RequestMethod.GET -> is a other whey to define the method
     * @RequestParams are the parameters inserted in the URL
     * in this example the parameter is not required and by default is Word
     * Thi is saved in a local method called name**/
    @RequestMapping(value="/index", method = RequestMethod.GET)
    public String index(@RequestParam(name="name", required = false, defaultValue = "Word") String name,
                           Model model){
        System.out.println("Home Page Requested: " + name);
        System.out.println(model.toString());
        model.addAttribute("name", name);
        System.out.println(model.toString());
        return "index";
    }

    @GetMapping("/index.html")
    public String indexController() {
        return "index";
    }
    @GetMapping("/signIn")
    public String signInController() {
        return "signIn";
    }
    @GetMapping("/signUp")
    public String signUpController() {
        return "signUp";
    }
    @GetMapping("/Mybookmarks")
    public String bookController() {
        return "Mybookmarks";
    }




}

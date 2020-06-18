package com.webapp.movieswebapp.Bookmark;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;

@RestController
public class BookmarkController {
    @Autowired
    private BookmarkService bookmarkService;
    @PostMapping("/bookmark")
    private String addBookmark(@RequestBody String movieId ,HttpServletRequest request){
        Principal principal = request.getUserPrincipal();
        Bookmark bookmark = new Bookmark();
        bookmark.setEmail(principal.getName());
        JSONObject jsonObject = new JSONObject(movieId);
        bookmark.setMovieId(jsonObject.getString("MovieId"));
        if(bookmarkService.getIfMovieIsAlreadyAdd(bookmark)!=null){
            return "Already Added";
        }
        bookmarkService.addBookmark(bookmark);
        return "successfully added";
    }
    @DeleteMapping("/bookmark")
    private String deleteBookmark(@RequestBody String bookmarkId, HttpServletRequest request){
        Principal principal = request.getUserPrincipal();
        System.out.println(principal.getName());
        Bookmark bookmark = new Bookmark();
        JSONObject jsonObject = new JSONObject(bookmarkId);
        bookmark.setEmail(principal.getName());
        String movieId = jsonObject.getString("MovieId");
        System.out.println(movieId);
        bookmark.setMovieId(movieId);
        bookmarkService.deleteBookmark(bookmark);
        return "successfully deleted";
    }
//    @GetMapping("/bookmark/{id}")
//    private Optional <Bookmark> getBookmark(@PathVariable int id){
//        return bookmarkService.getBookmark(id);
//    }

    @GetMapping("/bookmark")
    private List<Bookmark> getBookmarks(HttpServletRequest request, HttpServletResponse response){
        Principal principal = request.getUserPrincipal();
        if(principal != null) {
            Cookie cookie = new Cookie("foo", "bar");
            cookie.setMaxAge(1 * 24 * 60 * 60); // expires in 1 days
            response.addCookie(cookie);
        }
        return bookmarkService.getBookmarks(principal.getName());
    }

    @GetMapping("/bookmarks")
    private List<Bookmark> getBookmark(){
        return bookmarkService.getAllBookmarks();
    }
}

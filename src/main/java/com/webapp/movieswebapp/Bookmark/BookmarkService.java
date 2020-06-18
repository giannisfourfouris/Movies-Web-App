package com.webapp.movieswebapp.Bookmark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {
    @Autowired
    private BookmarkRepository bookmarkRepository;

    public void addBookmark(Bookmark bookmark){
        bookmarkRepository.save(bookmark);
    }
    public void deleteBookmark(Bookmark bookmark){

        bookmarkRepository.deleteBookmarkEm(bookmark.getEmail(),bookmark.getMovieId());
    }

    public List<Bookmark> getBookmarks(String mail){
        return  bookmarkRepository.findByEmailAddress(mail);
    }
    public Bookmark getIfMovieIsAlreadyAdd(Bookmark bookmark){
        return  bookmarkRepository.findIfUserHasAlreadyTheMovie(bookmark.getEmail(),bookmark.getMovieId());
    }
    public Optional <Bookmark> getBookmark(int id){
        return  bookmarkRepository.findById(id);
    }
    public List<Bookmark> getAllBookmarks(){
        return (List<Bookmark>) bookmarkRepository.findAll();
    }

}

package com.webapp.movieswebapp.Bookmark;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface BookmarkRepository extends CrudRepository<Bookmark, Integer> {
    @Query("SELECT u FROM Bookmark u where u.email = ?1 ")
    List<Bookmark> findByEmailAddress( String email);
    @Query("SELECT u FROM Bookmark u where u.email = ?1 AND u.MovieId = ?2")
    Bookmark findIfUserHasAlreadyTheMovie( String email, String movieId);
    @Modifying
    @Query("DELETE  FROM Bookmark u where u.email = ?1 AND  u.MovieId = ?2")
    void deleteBookmarkEm(String email, String movieId);

}

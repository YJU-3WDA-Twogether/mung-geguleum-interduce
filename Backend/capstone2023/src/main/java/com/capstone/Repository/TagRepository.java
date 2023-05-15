package com.capstone.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.capstone.Entity.Tag;

public interface TagRepository extends JpaRepository<Tag , Long>{

	  @Query("SELECT distinct t FROM Tag t JOIN t.post p JOIN p.user u")
	    List<Tag> findTagWithPostAndUser();
	  
	  
	  @Query("SELECT distinct t.post.pno, t.log.lno FROM Tag t")
	  List<Object[]> findPostAndLog();
	  
	  @Query("SELECT distinct t, p, l FROM Tag t JOIN t.post p JOIN t.log l")
	  List<Object[]> findAllWithPostAndLog(); 

}

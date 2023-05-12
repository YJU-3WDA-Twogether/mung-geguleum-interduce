package com.capstone.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.Entity.Board;
import com.capstone.Entity.Post;
import com.capstone.Entity.User;


public interface PostRepository extends JpaRepository<Post, Long>{

	Post findByTitle(String title);
	//findBySubject를 사용하고싶다면 사용하고싶은 인터페이스에 findBySubject를 추가해줘야한다.
	
	Post findByTitleAndContent(String title, String content);
	//컬럼명중 subject와 content의 밸류를 찾는 메서드이다.
	
	Optional<Post> findByPno(Long pno);
	
	List<Post> findByTitleLike(String title);
	
	Page<Post> findAll(Pageable pageable);
	
	Page<Post> findAllByUserAndBoard(User user, Board board, Pageable pageable);
	
	
	    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.files")
	    List<Post> findAllWithFiles();
	    


	    
	  //모든게시판을 조회하기위해서 사용하는 쿼리다. 애는 된다.
		  @Query("SELECT distinct p, b, u FROM Post p JOIN p.board b JOIN p.user u left JOIN p.files")
		    Page<Object[]> findAllWithBoardAndUser(Pageable pageable);
		    
//		    @Query("SELECT distinct p, b, u, f FROM Post p JOIN p.board b JOIN p.user u LEFT JOIN p.files f WHERE f.fsname IN ('mp3', 'png', 'mp4')")
//		    Page<Object[]> findAllWithBoardAndUserAndFiles(Pageable pageable);

		    
	    @Query("SELECT distinct p, b, u FROM Post p left JOIN p.files JOIN p.board b JOIN p.user u  WHERE b.bname = :bname ORDER BY p.pno DESC")
	    Page<Object[]> findAllByBoardName(String bname, Pageable pageable);

	   


	
}

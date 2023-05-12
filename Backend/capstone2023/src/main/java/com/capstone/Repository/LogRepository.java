package com.capstone.Repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.Entity.Log;

public interface LogRepository extends JpaRepository<Log ,Long>{

//	@Query("SELECT distinct l,u from Log l Join p.")
//	List<Object[]> findAllByUserNoAndDate(Long uno, String date ,Pageable pageable);
	//List<Log> findByPuserUnoAndRegDate(Long userNo, LocalDateTime regDate);
	
//	@Query("SELECT l FROM Log l WHERE l.user.uno = :uno AND l.regDate LIKE %:date%")
//	Page<Log> findByUserAndRegDate(@Param("uno") Long uno, @Param("date") LocalDateTime date, Pageable pageable);
//	@Query("SELECT l FROM Log l WHERE l.user.uno = :uno AND DATE_FORMAT(l.regDate, '%Y-%m-%d') LIKE %:date%")
//	Page<Log> findByUserAndRegDate(@Param("uno") Long uno, @Param("date") String date, Pageable pageable);
	@Query("SELECT l FROM Log l WHERE l.user.uno = :uno AND DATE_FORMAT(l.regDate, '%Y-%m') LIKE %:date%")
	Page<Log> findByUserAndRegDate(@Param("uno") Long uno, @Param("date") String date, Pageable pageable);
	 
	@Query("SELECT l From Log l WHERE l.user.uno = :uno AND l.logState.lsno = :lsno")
	Page<Log> findByUserAndLogState(@Param("uno") Long uno, @Param("lsno") Long lsno, Pageable pageable);
	
	@Query("SELECT l From Log l WHERE l.puser.uno = :puno AND l.logState.lsno = :lsno")
	Page<Log> findByPuserAndLogState(@Param("puno") Long puno, @Param("lsno") Long lsno, Pageable pageable);
	
	
	
}
	
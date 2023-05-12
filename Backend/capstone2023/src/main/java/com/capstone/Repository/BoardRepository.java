package com.capstone.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.Entity.Board;
import com.capstone.Entity.Post;

public interface BoardRepository extends JpaRepository<Board, Long>{
	Optional<Board> findByBno(Long bno);

}

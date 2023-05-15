package com.capstone.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.Entity.Board;
import com.capstone.Repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {
	private final BoardRepository boardRepository;
	
	@Transactional
	public Board getBoardByBno(Long bno) {
		Optional<Board> board = boardRepository.findByBno(bno);
		if(board.isPresent()) {
			return board.get();
		}else {
			return null;
		}
		
	}
}

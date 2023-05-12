package com.capstone.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.capstone.Entity.Board;
import com.capstone.Mapper.PostMapper;
import com.capstone.Repository.BoardRepository;
import com.capstone.Repository.PostRepository;
import com.capstone.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {
	private final BoardRepository boardRepository;
	
	public Board getBoardByBno(Long bno) {
		Optional<Board> board = boardRepository.findByBno(bno);
		if(board.isPresent()) {
			return board.get();
		}else {
			return null;
		}
		
	}
}

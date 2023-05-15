package com.capstone.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.DTO.Log.LogRequest;
import com.capstone.DTO.Log.LogResponse;
import com.capstone.Entity.Log;
import com.capstone.Entity.LogState;
import com.capstone.Entity.Post;
import com.capstone.Entity.User;
import com.capstone.Mapper.LogMapper;
import com.capstone.Repository.LogRepository;
import com.capstone.Repository.LogStateRepository;
import com.capstone.Repository.PostRepository;
import com.capstone.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
	private final LogMapper logMapper;
	private final PostRepository postRepository;
	private final UserRepository userRepository;
	private final LogStateRepository logStateRepository;
	private final LogRepository logRepository;
		
	//일단 로그 생성하는거 
	//로그생성하는 경우는 게시글 등록을 했을때, 파일을 다운로드 받았을떄, 
	@Transactional
	public Log LogCreate(LogRequest logRequest) {
		System.out.println("로그 생성 요청");
		Optional<Post> post = this.postRepository.findByPno(logRequest.getPno());
		Optional<LogState> logState = this.logStateRepository.findByLsno(logRequest.getLsno());
		Optional<User> user = this.userRepository.findByUno(logRequest.getUno());
		Optional<User> puser = this.userRepository.findByUno(logRequest.getPuno());
		Log log;
		if(post.isPresent() && logState.isPresent() && user.isPresent() && puser.isPresent()) {
			log = logMapper.toEntity(post.get(),logState.get(),user.get(),puser.get(), logRequest);
			log = this.logRepository.save(log);
			
			return log;
		}else {
			System.out.println("LogService : Create 부분에 엔티티 타입 값에 null이 존재합니다. ");
		}
		
		return null;
	}
	
	
	//달력로그 호출하는 메소드
	@Transactional
	public Page<LogResponse> getList(int page, String date, Long uno){
		//Pageable pageable = PageRequest.of(page,10);
		Pageable pageable = PageRequest.of(page,100);
		Page <Log> logList = this.logRepository.findByUserAndRegDate(uno, date, pageable);
 		return logList.map(log -> this.logMapper.toLogResponse(log));
	}
	
	
		
	//다운로드 로그 호출하는 메소드.
	@Transactional
	public Page<LogResponse> getDownList(Long puno, int page){
		Pageable pageable = PageRequest.of(page,100);
		//Pageable pageable = PageRequest.of(page,10);
		Page <Log> logList = this.logRepository.findByPuserAndLogState(puno, 2L, pageable);
 		return logList.map(log -> this.logMapper.toLogResponse(log));
		
	}
	
	@Transactional
	public Page<LogResponse> getTagList(Long uno, int page){
		//Pageable pageable = PageRequest.of(page,10);
		Pageable pageable = PageRequest.of(page,100);
		Page <Log> logList = this.logRepository.findByUserAndLogState(uno, 2L, pageable);
 		return logList.map(log -> this.logMapper.toLogResponse(log));
		
	}
	

}

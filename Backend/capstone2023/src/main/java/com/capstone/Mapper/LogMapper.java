package com.capstone.Mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.capstone.DTO.Log.LogRequest;
import com.capstone.DTO.Log.LogResponse;
import com.capstone.Entity.Log;
import com.capstone.Entity.LogState;
import com.capstone.Entity.Post;
import com.capstone.Entity.User;

import jakarta.validation.Valid;

@Component
public class LogMapper {
	public Log toEntity(Post post, LogState logState, User user, User puser,@Valid LogRequest logRequest  ) {
		return Log.builder()
				.lno(logRequest.getLno())
				.puser(puser)
				.user(user)
				.post(post)
				.logState(logState)
				.regDate(logRequest.getRegDate())
				.build();
	}
	
	
	
	public LogRequest toRequestLog(Long lsno, Long uno, Long pno, LocalDateTime time) {
		return LogRequest.builder()
				.lsno(lsno)
				.uno(uno)
				.puno(uno)
				.pno(pno)
				.regDate(time)
				.build();
	}
	
	public LogRequest toRequestLog(Long lsno, Long uno,Long puno, Long pno, LocalDateTime time) {
		return LogRequest.builder()
				.lsno(lsno)
				.uno(uno)
				.puno(puno)
				.pno(pno)
				.regDate(time)
				.build();
	}
	
	public LogResponse toLogResponse(Log log) {
		return LogResponse.builder()
				.lno(log.getLno())
				.lsname(log.getLogState().getLsname())
				.puno(log.getPuser().getUno())
				.punickname(log.getPuser().getNickname())
				.uno(log.getUser().getUno())
				.unickname(log.getUser().getNickname())
				.pno(log.getPost().getPno())
				.ptitle(log.getPost().getTitle())
				.regDate(log.getRegDate())
				.build();
	}
}

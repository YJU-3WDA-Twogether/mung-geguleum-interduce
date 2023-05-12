package com.capstone.DTO.Log;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LogRequest {
	
	private Long lno ;
	
	private Long lsno; 
	
	//다운로드 경우에는 puno와 uno의 값이 다르다.
	//게시글 등록인 경우 두개의 값이 일치한다. 
	
	//게시글 작성자 유저 넘버
	private Long puno;
	
	//다운로드한 유저넘버 다운로드
	//게시글 작성같은경우에는 같은 유저로 저장한다.
	private Long uno;
	
	//게시글 번호
	private Long pno;
	
	private LocalDateTime regDate;
	
	private LocalDateTime modDate;
}

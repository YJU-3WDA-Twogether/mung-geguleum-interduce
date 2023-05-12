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

public class LogResponse{
	
	private Long lno ;
	
	private String lsname ; 
	
	//게시글 작성자 유저 넘버
	private Long puno;
	
	private String punickname;
	
	//다운로드한 유저넘버 
	private Long uno;
	
	//유저 이름
	private String unickname;
	
	//게시글 번호
	private Long pno;
	
	//게시글 제목
	private String ptitle;
	
	
	private LocalDateTime regDate;
	
	private LocalDateTime modDate;
}

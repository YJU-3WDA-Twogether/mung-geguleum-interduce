package com.capstone.DTO.Post;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.DTO.Tag.TagRequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
@Component
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
	
	
	private Long pno;
	
	private String title;
	
	private String content;

	private LocalDateTime regDate;
	
	private LocalDateTime modDate;
	
	private Long bno;
	
	private Long uno;
	
	MultipartFile[] file;
	
	//재창작을 진행할때 태그 삽입이 가능하다.
	Long[] tag;
	

	
}
package com.capstone.DTO.Post;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Component;

import com.capstone.DTO.File.FileDTO;

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
public class PostResponse {
	private Long pno;
	
	private String title;
	
	private String content;

	private LocalDateTime regDate;
	
	private LocalDateTime modDate;
	
	private String bname;
	
	private String uid;
	
	List <FileDTO> file;
}

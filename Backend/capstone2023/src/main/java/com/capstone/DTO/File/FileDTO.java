package com.capstone.DTO.File;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

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
public class FileDTO {
	
	private Long fno;
	private String fname;
	private String fpath;
	private String fsname;
	private Long fsize;
	private LocalDateTime regDate;
	private Long pno;
	
	

}

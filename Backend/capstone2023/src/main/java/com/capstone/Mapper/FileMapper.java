package com.capstone.Mapper;

import java.nio.file.Path;
import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.capstone.DTO.File.FileDTO;
import com.capstone.Entity.File;
import com.capstone.Entity.Post;

import jakarta.validation.Valid;

@Component
public class FileMapper {

	//Entity에 DTO담기
	public File toEntity(@Valid FileDTO fileDTO, Post post) {
		return File.builder()
				.fno(fileDTO.getFno())
				.fname(fileDTO.getFname())
				.fpath(fileDTO.getFpath())
				.regDate(fileDTO.getRegDate())
				.post(post)
				.build();
		
	}
	
	//Entity에 DTO담기
		public File toEntity(@Valid FileDTO fileDTO) {
			return File.builder()
					.fno(fileDTO.getFno())
					.fname(fileDTO.getFname())
					.fpath(fileDTO.getFpath())
					.regDate(fileDTO.getRegDate())
					.post(null)
					.build();
			
		}
	
	//Entity에 DTO담기
	public  File toEntity(MultipartFile file, Path filePath , LocalDateTime date ,Post post) {
		return File.builder()
				.fname(file.getOriginalFilename())
				.fsize(file.getSize())
				.fpath(filePath.toString())
				.regDate(date)
				.post(post)
				.build();
		
	}
	public  File toEntity(String fname, String fsname,Long fsize ,String fpath , LocalDateTime date ,Post post) {
		return File.builder()
				.fname(fname)
				.fsname(fsname)
				.fsize(fsize)
				.fpath(fpath)
				.regDate(date)
				.post(post)
				.build();
		
	}
	
	
	
	//DTO에 Entity담기
	public FileDTO toFileDTO(File file, Long pno) {
		return FileDTO.builder()
				.fno(file.getFno())
				.fname(file.getFname())
				.fpath(file.getFpath())
				.fsname(file.getFsname())
				.fsize(file.getFsize())
				.regDate(file.getRegDate())
				.pno(pno)
				.build();
	}
	
	//DTO에 Entity담기
		public FileDTO toFileDTO(File file, boolean b ) {
			return FileDTO.builder()
					.fno(file.getFno())
					.fname(file.getFname())
					.fpath(file.getFpath())
					.regDate(file.getRegDate())
					.pno(null)
					.build();
		}
	
	//DTO에 Entity담기
		public static FileDTO toFileDTO(MultipartFile file, Path filePath , LocalDateTime date, Long pno) {
			return FileDTO.builder()
					
					.fname(file.getOriginalFilename())
					.fsize(file.getSize())
					.fpath(filePath.toString())
					.regDate(date)
					.pno(pno)
					.build();
		}
}

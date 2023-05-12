package com.capstone.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.capstone.DTO.File.FileDTO;
import com.capstone.DTO.Post.PostRequest;
import com.capstone.DTO.Post.PostResponse;
import com.capstone.Entity.Board;
import com.capstone.Entity.Post;
import com.capstone.Entity.User;
import com.capstone.Repository.UserGradeRepository;
import com.capstone.Repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PostMapper {
	
	private final FileMapper fileMapper;
	public Post toEntity(@Valid PostRequest postDTO ) {
		return Post.builder()
				.pno(postDTO.getPno())
				.title(postDTO.getTitle())
				.content(postDTO.getContent())
				.build();
	}
	
	public Post toEntity(@Valid PostRequest postDTO , Board board, User user) {
		return Post.builder()
				.pno(postDTO.getPno())
				.title(postDTO.getTitle())
				.content(postDTO.getContent())
				.user(user)
				.board(board)
				.build();
	}
	
	
	


	
	
	//DTO에 Entity 담기 
	public PostRequest toPostPostRequest(Post post) {
		return PostRequest.builder()
				.pno(post.getPno())
				.title(post.getTitle())
				.content(post.getContent())
				.regDate(post.getRegDate())
				.modDate(post.getModDate())
				.build();
	}
	
	//DTO에 Entity 담기 
		public PostResponse toPostPostResponse(Post post) {
			return PostResponse.builder()
					.pno(post.getPno())
					.title(post.getTitle())
					.content(post.getContent())
					.regDate(post.getRegDate())
					.modDate(post.getModDate())
					
					.build();
		}
	
	//DTO에 Entity 담기 페이징 기능을 할때 파일도 담아서 같이보낸다. postEntity에서 조인을 통해서 데이터 호출해야함.
		public PostResponse toPostDTO(Post post, List<FileDTO> file) {
			return PostResponse.builder()
					.pno(post.getPno())
					.title(post.getTitle())
					.content(post.getContent())
					.regDate(post.getRegDate())
					.modDate(post.getModDate())
					.file(file)
					.build();
		}
		
		
		
		//DTO에 Entity 담기 
				public PostResponse toPostResponse(Post post,Board board, User user) {
					return PostResponse.builder()
							.pno(post.getPno())
							.title(post.getTitle())
							.content(post.getContent())
							.regDate(post.getRegDate())
							.modDate(post.getModDate())
							.bname(board.getBname())
							.uid(user.getUid())
							.file(post.getFiles().stream().map(file -> fileMapper.toFileDTO(file,post.getPno())).collect(Collectors.toList()))
							//.file((post.getFiles()).map(file -> this.fileMapper.toFileDTO(file)))
							.build();
					
							
				}
}

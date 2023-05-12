package com.capstone.Service;



import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.capstone.DTO.Log.LogRequest;
import com.capstone.DTO.Post.PostRequest;
import com.capstone.DTO.Post.PostResponse;
import com.capstone.Entity.Board;
import com.capstone.Entity.Log;
import com.capstone.Entity.Post;
import com.capstone.Entity.User;
import com.capstone.Mapper.LogMapper;
import com.capstone.Mapper.PostMapper;
import com.capstone.Repository.BoardRepository;
import com.capstone.Repository.PostRepository;
import com.capstone.Repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PostService {
	private final UserRepository userRepository;
	private final PostRepository postRepository;
	private final BoardRepository boardRepository;
	private final FileService fileService;
	private final LogService logService;
	private final TagService tagService;
	
	private final PostMapper postMapper;
	private final LogMapper logMapper;
	
	//게시판 생성 메소드
	@Transactional
	public void postCreate(PostRequest postRequest) throws IOException {
		System.out.println("누군가 게시글 등록을했다.");
		LocalDateTime time = LocalDateTime.now();
		
		postRequest.setRegDate(time);
		
		Optional<User> user = this.userRepository.findByUno(postRequest.getUno());
		Optional<Board> board = this.boardRepository.findByBno(postRequest.getBno());
		Post post = postMapper.toEntity(postRequest,board.get(),user.get());

		//파일업로드가 존재할 경우 fileService를 호출한다.
	
		//Post post = postMapper.toEntity(postDTO);
		post = this.postRepository.save(post);
		if(postRequest.getFile()!=null) {
			this.fileService.uploadFile(postRequest.getFile(),post ,time);
			System.out.println("파일존재한다.");
		}else {
			System.out.println("파일없다.");
		}
		
		//게시글 등록후 로그 발행.
		Long lsno = 1L;
		LogRequest logRequest = logMapper.toRequestLog(lsno, user.get().getUno(), post.getPno(),time);
		Log log = this.logService.LogCreate(logRequest);
		//재창작이 아닐경우
		if(board.get().getBno()!=4) {
			
		}else {
			//tag값은 필수여야함. 
			if(postRequest.getTag() != null) {
				tagService.tagCreate(postRequest.getTag(),post);
			}
		
		}

		
	}
	
	//모든페이지 전체조회함.
	@Transactional
	public Page<PostResponse> getList(int page) {
		Pageable pageable = PageRequest.of(page,30);
		//Pageable pageable = PageRequest.of(page,10);
	    Page<Object[]> result = postRepository.findAllWithBoardAndUser(pageable);
		// Page<Object[]> result = postRepository.findAllWithBoardAndUserAndFiles(pageable);
	    return result.map(objects -> {
	        Post post = (Post) objects[0];
	        Board board = (Board) objects[1];
	        User user = (User) objects[2];
	        return postMapper.toPostResponse(post,board,user) ;
	        		
	    });
	}

	
	//한 종류 게시글 조회
	@Transactional
	public Page<PostResponse> getList(int page, String bname){
		//Pageable pageable = PageRequest.of(page,10);
		 Pageable pageable = PageRequest.of(page, 30, Sort.by("pno").descending());
		Page<Object[]> result = postRepository.findAllByBoardName(bname, pageable);


	    return result.map(objects -> {
	        Post post = (Post) objects[0];
	        Board board = (Board) objects[1];
	        User user = (User) objects[2];
	        
	        return postMapper.toPostResponse(post,board,user) ;
	        		
	    });
	}
	
	

	//게시판 수정 메소드
	@Transactional
	public PostResponse postUpdate(Long pno, PostRequest postDTO) {
		Optional<Post> post= this.postRepository.findByPno(pno);
		if(post.isPresent()){
			Optional<User> user = this.userRepository.findByUno(postDTO.getUno());
			Optional<Board> board = this.boardRepository.findByBno(postDTO.getBno());
			Post Post = postMapper.toEntity(postDTO,board.get(),user.get());
			//Post Post = postMapper.toEntity(postDTO);
			this.postRepository.save(Post);
			return postMapper.toPostPostResponse(Post);
		}
		return null;
	}
	
	
	//게시판 삭제메소드
	@Transactional
	public void postDelete(Long pno) {
		this.postRepository.deleteById(pno);
	}
		


	
}

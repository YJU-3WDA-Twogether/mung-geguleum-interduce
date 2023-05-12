package com.capstone.Controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.capstone.DTO.Log.LogResponse;
import com.capstone.DTO.Post.PostResponse;
import com.capstone.Service.LogService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/log")
public class LogController {
	private final LogService logService;
	
//	@ResponseBody
//	@GetMapping("/getlist/{bname}")
//	public ResponseEntity<Log> getList(@RequestParam(value="page", defaultValue="0") int page,@PathVariable String bname) {
//		System.out.println("누군가 게시판 전체조회를 시도했다.");
//		Page<PostResponse> paging = this.logService.getList(page, bname);
//		
//		if(paging != null) {
//			System.out.println("게시판 전체조회 성공");
//			return ResponseEntity.ok(paging);	
//		}else {
//			System.out.println("게시판 전체조회 실패");
//			return new ResponseEntity<>(paging, HttpStatus.BAD_REQUEST);
//		}
//	}
	
	//달력로그 확인하는 메소드. 
	@GetMapping("/getlist")
	public ResponseEntity<Page> getList(@RequestParam String date, @RequestParam Long uno , @RequestParam(defaultValue = "0") int page) {
//		public ResponseEntity<Page> getList() {
//		int page = 0;
//		String date = "2023-04";
//		Long uno = 33L;
		// date와 userid로 로그를 조회하고, page와 size로 페이징 처리를 수행하는 코드 작성
		Page<LogResponse> paging = this.logService.getList(page, date, uno );
		if(paging != null) {
			System.out.println("Log 조회 성공");
			return ResponseEntity.ok(paging);
		}else {
			System.out.println("Log 조회 실패");
			return new ResponseEntity<>(paging, HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	//다운로드 로그 확인하는 메소드 필요함.
	@GetMapping("/getdownlist")
	public ResponseEntity<Page> getDownList (@RequestParam Long uno, @RequestParam(defaultValue = "0") int page){
		Page<LogResponse> paging = this.logService.getDownList(uno, page);
		if(paging != null) {
			System.out.println("다운로드 로그 조회 성공");
			return ResponseEntity.ok(paging);
		}else {
			System.out.println("다운로드 로그 조회 실패");
			return new ResponseEntity<>(paging, HttpStatus.BAD_REQUEST);
		}
	}
	
	//재창작태그 삽입하는 메소드 필요함
	@GetMapping("/gettaglist")
	public ResponseEntity<Page> getTagList (@RequestParam Long uno, @RequestParam(defaultValue = "0") int page){
		System.out.println("태그리스트 실행됨.");
		Page<LogResponse> paging = this.logService.getTagList(uno, page);
		if(paging != null) {
			System.out.println("태그 로그 조회 성공");
			return ResponseEntity.ok(paging);
		}else {
			System.out.println("다운로드 로그 조회 실패");
			return new ResponseEntity<>(paging, HttpStatus.BAD_REQUEST);
		}
	}
	
}

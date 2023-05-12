package com.capstone.Controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.DTO.User.UserCreateForm;
import com.capstone.DTO.User.UserDTO;
import com.capstone.DTO.User.UserLoginForm;
import com.capstone.Service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
//@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
	
	private final UserService userService;
	//private final User user;
	
	//사용자 전체조회 json형태로 반환
		@ResponseBody
		@GetMapping("/list")
		public ResponseEntity<Page> list (@RequestParam(value="page", defaultValue="0") int page) {
			Page<UserDTO> list = this.userService.getList(page);
			
			if(list != null) {
				return ResponseEntity.ok(list);	
			}else {
				return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST); 
				
			}
			
		}
		//사용자 전체 조회한 거 리턴함 페이징기능
			
	

	//json형태로 데이터를 보내야함.
	//사용자 생성 json형태로 반환.
	@PostMapping("/create")
	public ResponseEntity<Boolean> userCreate(@Valid @RequestBody UserCreateForm userCreateForm,BindingResult bindingResult) {
		
		System.out.println("누군가 회원가입을 시도했다.");
		if(bindingResult.hasErrors()) {
			System.out.println("바인딩에러");
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
		
		if(!userCreateForm.getPassword().equals(userCreateForm.getPassword2())) {
			bindingResult.rejectValue("password2", "passwordInCorrect" , "2개의 패스워드가 일치하지 않습니다.");
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
		
		try {
			userService.userCreate(userCreateForm);
		}catch(DataIntegrityViolationException e) {
			e.printStackTrace();
			bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

		}catch(Exception e) {
			e.printStackTrace();
			bindingResult.reject("signupFailed", e.getMessage());
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
		 return ResponseEntity.ok(true);
	}
	
	
	
	@ResponseBody
	@GetMapping("/read/{uno}")
	public ResponseEntity<UserDTO> userGet (@PathVariable Long uno) {
		//System.out.println(uno);
		UserDTO userDTO = this.userService.userGet(uno);
	
		if(userDTO != null) {
			return ResponseEntity.ok(userDTO);
		}
		else {
			return new ResponseEntity<>(userDTO, HttpStatus.NO_CONTENT);
		}
		
	}
	
	@PutMapping("/update/{uno}")
	public ResponseEntity<Boolean> userUpdate(@PathVariable Long uno ,@Valid @RequestBody UserDTO userDTO,BindingResult bindingResult) {
		
		System.out.println("누군가 정보를 수정을 시도했다.");
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
		
		UserDTO updateUser;
		
		
		try {
			updateUser = userService.userUpdate(uno , userDTO);
		}catch(DataIntegrityViolationException e) {
			e.printStackTrace();
			bindingResult.reject("UpdateFailed", "오류가 발생 했습니다.");
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

		}catch(Exception e) {
			e.printStackTrace();
			bindingResult.reject("UpdateFailed", e.getMessage());
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
		if(updateUser == null ) {
			return ResponseEntity.notFound().build();
		}
		
		 return ResponseEntity.ok(true);
	}
	
	
	//사용자 삭제 
	@DeleteMapping("/delete/{uno}")
	public ResponseEntity<Boolean> userDelete(@PathVariable Long uno){
		System.out.println(uno+"가 회원탈퇴를 눌렀습니다.");
		try {
		this.userService.userDelete(uno);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(false , HttpStatus.NO_CONTENT);
			
		}
		
		return new ResponseEntity<>(true, HttpStatus.NO_CONTENT);
	}
	
	//json형태로 데이터를 보내야함.
	@PostMapping("/login")
	//public ResponseEntity<Boolean> userLogin(@Valid @RequestBody UserLoginForm userLoginForm,BindingResult bindingResult) {
	public ResponseEntity<?> userLogin(@Valid @RequestBody UserLoginForm userLoginForm,BindingResult bindingResult) {
		System.out.println("누군가 로그인을 시도했다.");
		
		if(bindingResult.hasErrors()) {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
			UserDTO userDTO =userService.login(userLoginForm.getUid(), userLoginForm.getPassword());
			
			if(userDTO != null) { //로그인 가능
				System.out.println("로그인 성공");
				return ResponseEntity.ok(userDTO);
			}else {
				System.out.println("로그인 실패");

				return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
			}
		
	}
	
//유저 관련 중복 체크란 
	//userid중복체크 
	@GetMapping("/useridchk/{userid}")
	public ResponseEntity<Boolean>  useridchk(@PathVariable String userid) {
		boolean b = this.userService.uidchk(userid);
		
		if(b) { //중복이라면
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}else {
			 return ResponseEntity.ok(true);
		}
	}
	
	//email중복체크
	@GetMapping("/emailchk/{email}")
	public ResponseEntity<Boolean> emailchk(@PathVariable String email){
		boolean b = this.userService.emailchk(email);
		
		if(b){
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}else {
			return ResponseEntity.ok(true);
		}
			
	}
	
	//nickname중복체크
		@GetMapping("/nicknamechk/{nickname}")
		public ResponseEntity<Boolean> nicknamechk(@PathVariable String nickname){
			boolean b = this.userService.nicknamechk(nickname);
			
			if(b){
				return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
			}else {
				return ResponseEntity.ok(true);
			}	
		}
		//유저 중복 체크 끝 
}

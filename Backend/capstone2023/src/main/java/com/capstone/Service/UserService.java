package com.capstone.Service;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.capstone.DTO.User.UserCreateForm;
import com.capstone.DTO.User.UserDTO;
import com.capstone.Entity.User;
import com.capstone.Entity.UserGrade;
import com.capstone.Mapper.UserMapper;
import com.capstone.Repository.UserGradeRepository;
import com.capstone.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserGradeRepository userGradeRepository;
	private final UserRepository userRepository;
	private final UserMapper userMapper;
//	private final PasswordEncoder passwordEncoder;
//	
	//유저 회원가입 메소드 
		public void userCreate(UserCreateForm userCreateForm) {
//			user.setPassword(passwordEncoder.encode(password));
		
			UserGrade userGrade = userGradeRepository.findByGname("일반").get();
			System.out.println(userGrade.getGid()+" "+userGrade.getGname());
					
			User User= userMapper.toEntity(userCreateForm,userGrade);
			
			this.userRepository.save(User);	
		}
	
	
	
	//유저 본인정보 조회메소드
	public UserDTO userGet(Long uno) {
		Optional<User> user = this.userRepository.findByUno(uno); 
		if(user.isPresent()) {
			UserDTO userDTO = userMapper.toUserDTO(user.get());
			return userDTO;
		}
			
		return null;
	}
	
	//유저 정보 수정 메소드 
	public UserDTO userUpdate(Long uno , UserDTO userDTO) {
		Optional<User> user = userRepository.findByUno(uno);
		if(user.isPresent()) {
			User User = userMapper.toEntity(userDTO);
			userRepository.save(User);
			return userMapper.toUserDTO(User);
			
		}
		return null;
	}
	
	
	
	
	//회원삭제 메소드
	public void userDelete(Long uno) {
		this.userRepository.deleteById(uno);
		
	}
	//유저 로그인 메소드 
	//추후에 시큐리티 및 jwt 발급을 추가해야함 23.04.04 작성한메소드. 
	public UserDTO login(String uid, String password) {
		Optional<User> user = this.userRepository.findByUidAndPassword(uid, password);
		UserDTO userDTO = userMapper.toUserDTO(user.get());
		if(user.isPresent()) { //로그인 성공임
			return userDTO;
		}else {
			return null;
		}
	}
	
//	public List<UserDTO> getList() {
//		List<User> user = this.userRepository.findAll();
//		
//		List<UserDTO> list = new ArrayList<>();
//		for(User User : user   ) {
//			list.add(userMapper.toUserDTO(User));
//		}
//		return list;
//	}
	
	
	//페이징 사용한 유저 조회
	 public Page<UserDTO> getList(int page) {
		Pageable pageable = PageRequest.of(page,10);
		Page <User> userList =  this.userRepository.findAll(pageable);
		return userList.map(user -> userMapper.toUserDTO(user));
	 }
	 
	//uid 중복체크메소드
		public boolean uidchk(String uid) {
			Optional<User> user = this.userRepository.findByUid(uid);
			if(user.isPresent()) {
				return true;
			}else {
				return false;
			}
		}
		
	//email중복체크메소드
		public boolean emailchk(String email) {
			Optional<User> user = this.userRepository.findByEmail(email);
			if(user.isPresent()) {
				return true;
			}else {
				return false;
			}
		}
		
	//nickname중복체크메소드
		public boolean nicknamechk(String nickname) {
			Optional<User> user = this.userRepository.findByNickname(nickname);
			if(user.isPresent()) {
				return true;
			}else {
				return false;
			}
		}

}

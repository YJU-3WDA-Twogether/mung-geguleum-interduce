package com.capstone.DTO.User;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@Setter
@ToString
@Component
public class UserLoginForm {
	
	@NotEmpty(message = "사용자ID는 필수항목 입니다.")
	private String uid;
	
	@NotEmpty(message = "비밀번호는 필수항목입니다.")
	private String password;
}

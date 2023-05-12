package com.capstone.DTO.User;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Component
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateForm {
	
	
	@NotEmpty(message = "사용자ID는 필수항목 입니다.")
	private String uid;
	
	@NotEmpty(message = "사용자이름은 필수항목 입니다.")
	private String uname;
	
	@NotEmpty(message = "비밀번호는 필수항목입니다.")
	private String password;
	
	@NotEmpty(message = "비밀번호는 확인 필수항목입니다.")
	private String password2;
	
	@NotEmpty(message = "이메일은 필수항목입니다.")
	@Email
	private String email;
	
	@NotEmpty(message = "닉네임은 필수항목입니다.")
	private String nickname;
	
//	@Builder
//	public User toEntity() {
//		return User.builder()
//				.number(null)
//				.userid(userid)
//				.username(username)
//				.password(password)
//				.email(email)
//				.nickname(nickname)
//				.build();
//	}
}

package com.capstone.DTO.User;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

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
public class UserDTO {
		
		private Long uno;
		
		private String uname;
		
		private String uid;
		
		private String password;
		
		@Email
		private String email;
		
		private String nickname;
}
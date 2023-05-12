package com.capstone.Mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.capstone.DTO.User.UserCreateForm;
import com.capstone.DTO.User.UserDTO;
import com.capstone.Entity.User;
import com.capstone.Entity.UserGrade;

import jakarta.validation.Valid;

@Component
public class UserMapper {
    public User toEntity(@Valid UserCreateForm userCreateForm) {
        return User.builder()
			 	.uid(userCreateForm.getUid())
                .uname(userCreateForm.getUname())
                .password(userCreateForm.getPassword())
                .email(userCreateForm.getEmail())
                .nickname(userCreateForm.getNickname())
              
                .build();
    }
    
    public User toEntity(@Valid UserCreateForm userCreateForm, UserGrade usergrade) {
        return User.builder()
			 	.uid(userCreateForm.getUid())
                .uname(userCreateForm.getUname())
                .password(userCreateForm.getPassword())
                .email(userCreateForm.getEmail())
                .nickname(userCreateForm.getNickname())
                .userGrade(usergrade)
                .regDate(LocalDateTime.now())
                .build();
    }
    
    public User toEntity(@Valid UserDTO userDTO) {
    	 return User.builder()
    			 .uno(userDTO.getUno())
 			 	 .uid(userDTO.getUid())
                 .uname(userDTO.getUname())
                 .password(userDTO.getPassword())
                 .email(userDTO.getEmail())
                 .nickname(userDTO.getNickname())
                 .userGrade(new UserGrade())
                 .build();
    }

    public UserCreateForm toUserCreateForm(User User) {
        return UserCreateForm.builder()
                .uid(User.getUid())
                .uname(User.getUname())
                .email(User.getEmail())
                .password(User.getPassword())
                .nickname(User.getNickname())
                .build();
    }
    
    public UserDTO toUserDTO(User User) {
    	return UserDTO.builder()
    			.uno(User.getUno())
    			.uid(User.getUid())
                .uname(User.getUname())
                .email(User.getEmail())
                .password(User.getPassword())
                .nickname(User.getNickname())
                .build();
    };
}


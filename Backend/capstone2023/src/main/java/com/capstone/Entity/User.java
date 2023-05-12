package com.capstone.Entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long uno;
	
	@Column
	private String uname;
	
	@Column
	private String uid;
	
	@Column
	private String password;
	
	@Column
	private String email;
	
	@Column
	private String nickname;
	
	@CreatedDate
	@Column(name="regdate")
	private LocalDateTime regDate;
	
	
	
// @Builder
//	public User (Long uno, String uid, String uname, String password, String email, String nickname ) {
//		this.uno = uno;
//		this.uid = uid;
//		this.uname = uname;
//		this.password = password;
//		this.email  = email;
//		this.nickname = nickname;
//		
//	};
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_grade_id")
    private UserGrade userGrade;
	
}	

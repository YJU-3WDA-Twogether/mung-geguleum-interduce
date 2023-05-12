package com.capstone.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Entity
@Getter
@AllArgsConstructor
public class UserGrade {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long gid;
	
	//등급명
	@Column
	private String gname;
	
	public UserGrade() {
		this.gid = 2L;
	}
}

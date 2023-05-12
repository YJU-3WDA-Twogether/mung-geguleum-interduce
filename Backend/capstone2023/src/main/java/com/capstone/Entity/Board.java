package com.capstone.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Board {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bno;
	
	//등급명
	@Column
	private String bname;
	
	 @Builder
		public Board (Long bno, String bname ) {
			this.bno = bno;
			this.bname = bname;
			
			
		};
}

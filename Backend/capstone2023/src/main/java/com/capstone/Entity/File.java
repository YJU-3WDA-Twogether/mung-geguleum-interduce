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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class File {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long fno;
	    
	    @Column(name = "fname")
	    private String fname;
	    
	    @Column(name = "fsname")
	    private String fsname;
	    
	    @Column(name = "fpath")
	    private String fpath;
	    
	    @Column(name = "fsize")
	    private Long fsize;
	    
	    @CreatedDate
		@Column(name="regdate")
		private LocalDateTime regDate;
	      
	   // @ManyToOne(fetch = FetchType.LAZY)
	    @ManyToOne()
	    @JoinColumn(name = "pno")
	    private Post post;

}

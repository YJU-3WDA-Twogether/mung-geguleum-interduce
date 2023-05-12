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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "log")
//@ToString
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lno")
    private Long lno;

    //게시글 작성한 유저에 대한 정보를 담는다.
    //로그인한사람과 해당 정보가 일치할 경우 알람로그에 전송된다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_uno")
    private User puser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lsno")
    private LogState logState;
    
    @CreatedDate
	@Column(name="regdate")
	private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pno")
    private Post post;

    //다운로드 한사람에 대한 정보를 담는다.
    //로그인한사람과 해당 컬럼과 정보가 일치하면 달력로그에 띄워준다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uno")
    private User user;
}


package com.capstone.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "log_state")
public class LogState {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lsno")
    private Long lsno;

    @Column(name = "lSName")
    private String lsname;
}


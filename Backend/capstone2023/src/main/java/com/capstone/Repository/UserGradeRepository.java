package com.capstone.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.Entity.UserGrade;


public interface UserGradeRepository extends JpaRepository<UserGrade, Long> {
	Optional<UserGrade> findByGname(String gname);
}


package com.capstone.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.Entity.Log;
import com.capstone.Entity.LogState;

public interface LogStateRepository extends JpaRepository<LogState, Long> {
	Optional<LogState>findByLsno(Long lsno);
}

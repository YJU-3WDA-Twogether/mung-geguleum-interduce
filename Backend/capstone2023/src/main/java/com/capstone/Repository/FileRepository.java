package com.capstone.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.Entity.File;


public interface FileRepository extends JpaRepository<File, Long> {
    
    Optional<File> findByFno(Long fno);
    
    List<File> findAll();
    
   // List<File> findByPno(Long pno);
    
    File save(File file);
    
    
   // void deleteByFno(Long fno);
}

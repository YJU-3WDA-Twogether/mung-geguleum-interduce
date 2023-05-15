package com.capstone.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.capstone.Entity.Log;
import com.capstone.Entity.Post;
import com.capstone.Entity.Tag;
import com.capstone.Repository.TagRepository;
import com.capstone.Service.TagService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor

@RequestMapping("/tag")
public class TagController {
	
	private final TagService tagService;

	  @GetMapping("/json")
	  public ResponseEntity<List<Object>> getTagJson() {
		  System.out.println("그래프 조회를 실행했다.");
	       List<Object> list = this.tagService.getTagJson();
	       if(list !=null) {
	    	   return new ResponseEntity<>(list, HttpStatus.OK);
	       }else {
	    	   return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST); 
	       }
	    }
}

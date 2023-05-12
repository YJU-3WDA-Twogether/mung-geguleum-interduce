package com.capstone.Mapper;

import org.springframework.stereotype.Component;

import com.capstone.DTO.Tag.TagResponse;
import com.capstone.Entity.Log;
import com.capstone.Entity.Post;
import com.capstone.Entity.Tag;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TagMapper {
	
	public Tag toEntity(Post post, Log log) {
		return Tag.builder()
				.post(post)
				.log(log)
				.build();
	}
	
	public TagResponse toTagResponse(Tag tag) {
		return TagResponse.builder()
				.pno(tag.getPost().getPno())
				.uno(tag.getPost().getUser().getUno())
				.nickname(tag.getPost().getUser().getNickname())
				.title(tag.getPost().getTitle())
				.regDate(tag.getPost().getRegDate())
				.build();
	}
	

}

package com.capstone.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.Entity.Log;
import com.capstone.Entity.Post;
import com.capstone.Entity.Tag;
import com.capstone.Mapper.TagMapper;
import com.capstone.Repository.LogRepository;
import com.capstone.Repository.TagRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class TagService {
	
	private final TagRepository tagRepository;
	private final LogRepository logRepository;
	private final TagMapper tagMapper;
	
	
	
	//태그 생성 메소드 만들기
	//태그 생성메소드는 postService 에서 만들어서 값을 받아서 할당해야함.
	//post Service에서 받을값은 게시글 pno와 로그 lno 의 값을 담아서 넣어줘야함.
	//근데 여기서 lno의 값은 post 할 경우 담겨져있는 tag [] 에서 값을추출해서 넣어줘야함. 
	@Transactional
	public void tagCreate(Long[] logs , Post post) {
		
		//지금은 임시로 Object이지만 추후에 front에서 데이터를 전송하는 타입으로 변경해서 다시받아야함.
		for(Long tmp : logs) {
			//tag 안에 담긴 lno를 바탕으로 찾아서 집어넣고 지금은 테스트로 1L을 넣음.
			Optional<Log> log = this.logRepository.findById(tmp);
			Tag tag = this.tagMapper.toEntity( post,log.get() );
			this.tagRepository.save(tag);
			
		}
	}
	@Transactional
	public List<Object> getTagJson() {
	    List<Object[]> tagList = this.tagRepository.findAllWithPostAndLog();
	    Set<Map<String, Object>> nodeList = new HashSet<>();
	    Set<Map<String, Long>> linkList = new HashSet<>();

	    Map<Long, Map<String, Object>> nodeMap = new HashMap<>();

	    for (Object[] result : tagList) {
	        Tag tag = (Tag) result[0];
	        Post post = (Post) result[1];
	        Log log = (Log) result[2];

	        Long pno = post.getPno();
	        Long lno = log.getLno();

	        // Node를 추가하는 부분
	        if (!nodeMap.containsKey(pno)) {
	            Map<String, Object> postNode = new HashMap<>();
	          //  postNode.put("pno", pno);
	            postNode.put("id", pno);
	            postNode.put("title", post.getTitle());
	            postNode.put("uno", post.getUser().getUno());
	            postNode.put("nickname" , post.getUser().getNickname());
	            postNode.put("type", "post");

	            nodeList.add(postNode);
	            nodeMap.put(pno, postNode);
	        }

	        if (!nodeMap.containsKey(lno)) {
	            Map<String, Object> logNode = new HashMap<>();
//	            logNode.put("pno", log.getPost().getPno());
	            logNode.put("id", log.getPost().getPno());
	            logNode.put("title", log.getPost().getTitle());
	            logNode.put("uno", log.getPost().getUser().getUno());
	            logNode.put("nickname", log.getPost().getUser().getNickname());
	            logNode.put("type", "log");

	            nodeList.add(logNode);
	            nodeMap.put(lno, logNode);
	        }

	        // LinkMap을 추가하는 부분
	        Map<String, Long> linkMap = new HashMap<>();
	        linkMap.put("source", log.getPost().getPno());
	        linkMap.put("target", pno);
	        linkList.add(linkMap);
	    }

	    // 결과값을 Map에 담아서 반환
	    Map<String, Object> resultMap = new HashMap<>();
	    resultMap.put("nodes", nodeList);
	    resultMap.put("links", linkList);

	    return Collections.singletonList(resultMap);
	}

	
}

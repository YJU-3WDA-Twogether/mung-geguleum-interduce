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
	private final TagRepository tagRepository;
	
	@GetMapping("/test")
	public void getList(){
		List<Object[]> results = tagRepository.findAllWithPostAndLog();

		for (Object[] result : results) {
		    Tag tag = (Tag) result[0];
		    Post post = (Post) result[1];
		    Log log = (Log) result[2];
		    System.out.println(tag.getTno());
		    System.out.println(post.getPno());
		    System.out.println(log.getLno());
		    System.out.println("---------------------------");
		    System.out.println(log.getPost().getPno());
		    System.out.println("---------------------------"+"\n");
		    // 사용할 코드 작성
		}
	}
	
	  @GetMapping("/json")
	    public ResponseEntity<List<Object>> getTagJson() {
		  System.out.println("그래프 조회를 실행했다.");
	       List<Object> list = this.tagService.getTagJson();
	    //   if(list != null)
	    	   return new ResponseEntity<>(list, HttpStatus.OK);
//	       else 
//	    	   return 
	    }
	  
	  
	  
//	  @GetMapping("/json")
//	    public ResponseEntity<Map<String, Object>> getTagJson1() {
//			  List<Map<String, Long>> result = tagRepository.findPostAndLog(); //조회한결과
//			  
//			  for (Map<String, Long> map : result) {
//				    Long pno = map.get("pno");
//				    Long lno = map.get("lno");
//				    System.out.println("pno: " + pno + ", lno: " + lno);
//				}
//
//			  
//		
//			  Set<Long> nodeSet = new HashSet<>();
//			  List<Map<String, Long>> linkList = new ArrayList<>();
//		
//			  for (Map<String, Long> map : result) {
//			      Long pno = map.get("pno");
//			      Long lno = map.get("lno");
//		
//			      // pno 노드 추가
//			      nodeSet.add(pno);
//		
//			      // 링크 추가
//			      Map<String, Long> linkMap = new HashMap<>();
//			      linkMap.put("source", lno);
//			      linkMap.put("target", pno);
//			      linkList.add(linkMap);
//			  }
//		
//			  Map<String, Object> graph = new HashMap<>();
//			  graph.put("node", nodeSet);
//			  graph.put("link", linkList);
//		
//			  return ResponseEntity.ok(graph);
//	  }

}

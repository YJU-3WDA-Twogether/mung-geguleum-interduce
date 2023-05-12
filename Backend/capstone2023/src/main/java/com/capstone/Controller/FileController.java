package com.capstone.Controller;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.capstone.Service.FileService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {
	
	private final FileService fileService;
	

//	 @PostMapping("/create")
//	    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
//	        File uploadedFile = fileService.uploadFile(file);
//	        return ResponseEntity.ok().body(uploadedFile);
//	    }
	    
		//파일 다운로드 메소드
//	    @GetMapping("/download/{fno}")
//	    public ResponseEntity<Resource> downloadFile(@PathVariable Long fno) {
//	    	Long uno = 3L;
//	    	Long pno = 10L;
	@GetMapping("/download/{fno}")
	    public ResponseEntity<Resource> downloadFile(@PathVariable Long fno,@RequestParam Long uno, @RequestParam Long pno) {
		
		System.out.println(uno+"가 파일을 다운로드 받았다. 파일 다운로드 컨트롤러 메소드 실행");
			
			ResponseEntity<Resource> result = this.fileService.downloadFile(fno, uno , pno);
	    	return result;
	    }
	    
	    //파일 보여주기 메소드
	    @GetMapping("/read/{fno}")
	    @ResponseBody
	    public Resource readFile(@PathVariable("fno") Long fno, Model model) throws IOException{
	    	System.out.println("파일 조회 메소드 실행되었습니다.");
	    	UrlResource url = this.fileService.readFile(fno);
	        return url;
	    }
	   
	    //파일 삭제 메소드
	    @DeleteMapping("/delete/{fno}")
	    public ResponseEntity<?> deleteFile(@PathVariable Long fno) {
	    	System.out.println("파일 삭제 메소드 실행되었습니다.");
	        this.fileService.deleteFile(fno);
	        return ResponseEntity.ok().build();
	    }
}

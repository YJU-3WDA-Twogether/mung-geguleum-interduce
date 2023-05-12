package com.capstone.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.capstone.DTO.File.FileDTO;
import com.capstone.DTO.Log.LogRequest;
import com.capstone.Entity.File;
import com.capstone.Entity.Log;
import com.capstone.Entity.Post;
import com.capstone.Entity.User;
import com.capstone.Mapper.FileMapper;
import com.capstone.Mapper.LogMapper;
import com.capstone.Repository.FileRepository;
import com.capstone.Repository.PostRepository;
import com.capstone.Repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;




@Service
@RequiredArgsConstructor
public class FileService {
	private final LogService logService;
	private final UserRepository userRepository;
	private final FileRepository fileRepository;
	private final PostRepository postRepository;
	private final FileMapper fileMapper;
	private final LogMapper logMapper;
    

   @Value("${file.dir}")
    private String fileDir;

   
   //파일 업로드 메소드
   @Transactional
   public Boolean uploadFile(MultipartFile [] files,Post post, LocalDateTime time) {
	   File file;
	   FileDTO fileDTO;
	   
	   try { 
       	for(MultipartFile filetmp : files) {
       			//원래파일 이름 추출
       			String fname = filetmp.getOriginalFilename();
       			//파일이름으로 쓸 uuid 생성
       			String uuid = UUID.randomUUID().toString();
       			//확장자 추출(ex .png)
       			String extension = fname.substring(fname.lastIndexOf("."));
       			
       			String fsname = uuid + extension;
       			
       			String fpath = fileDir + fsname;
       			Long fsize = filetmp.getSize();
	         
	           
	            file = fileMapper.toEntity(fname, fsname,fsize,fpath, time, post);
       		
	            filetmp.transferTo(new java.io.File(fpath));
	            
	            fileRepository.save(file);
	             
       	}
	   }catch(IOException e){
       		e.printStackTrace();
       		return false;
        
       }finally {
       	
       }
       return true;
   }
   //파일 다운로드메소드 
  //  public ResponseEntity<Resource> downloadFile(Long fno) {
       
   @Transactional
   public ResponseEntity<Resource> downloadFile(Long fno, Long uno, Long pno ) {
        Optional <File> file = fileRepository.findByFno(fno);
       
        if(file.isPresent()) {
	        Path filePath = Paths.get(file.get().getFpath());
	        try {
	        	 UrlResource resource = new UrlResource("file:" + file.get().getFpath());
	        	 String encodedFileName = UriUtils.encode(file.get().getFname(), StandardCharsets.UTF_8);
	        	 String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";
	        	 
	        	 //파일 다운로드 로그 생성.
	        	 Optional<Post> post= this.postRepository.findByPno(pno);
	        	 Optional<User> user = this.userRepository.findByUno(uno);
	        	 LocalDateTime time = LocalDateTime.now();
	        	 //2L은 파일다운로드를 의미한다.
	        	 
	        	 LogRequest logRequest = logMapper.toRequestLog(2L, user.get().getUno(), post.get().getUser().getUno(), post.get().getPno(),time);
	        	 System.out.println("로그리퀘스트 제대로 저장됨?" +logRequest.toString());
	     		 Log log = this.logService.LogCreate(logRequest);
	     		 
	        	 return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,contentDisposition).body(resource);
	        }catch(MalformedURLException e) {
	        	e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	     }else{
	    	 return ResponseEntity.notFound().build();
        }
      
    }
    
    //파일 단일 조회메소드 
   @Transactional
    public UrlResource readFile(Long fno) {
    	 Optional <File> file = fileRepository.findByFno(fno);
    	 
    	 try {
			return new UrlResource("file:" + file.get().getFpath());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
    	 return null;
    	
    }
    //여러 파일 조회 메소드 게시글에 종속된 파일 불러올 수 있다.
//    public List<FileDTO> getFile(Long pno){
//    	List<File> fileList = this.fileRepository.findByPno(pno);
//    	
//    	List<FileDTO> fileDTOList = fileList.stream()
//    		    .map(fileMapper::toFileDTO)
//    		    .collect(Collectors.toList());
//    		    
//    		return fileDTOList;
//    	
//    	
//    }
   
   @Transactional
    public void deleteFile(Long fno) {
   	 	Optional <File> file = fileRepository.findByFno(fno);
          
        
        if(file.isPresent()) {
        	File files = fileMapper.toEntity(fileMapper.toFileDTO(file.get(), true));
        	 this.fileRepository.save(files);
        	 System.out.println("파일 삭제 했습니다.");
        }else {
        	System.out.println("삭제할 파일이 없습니다.");
        }
        
       
    }


  }
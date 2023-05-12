package com.capstone.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	private String address ="http://172.20.16.82:3000";
	private String localhost = "http://localhost:3000";
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
         
       	.allowedOrigins(localhost)
        //	.allowedOrigins(address)
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
        
    }
}

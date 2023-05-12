package com.capstone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Capstone2023Application {

	public static void main(String[] args) {
		SpringApplication.run(Capstone2023Application.class, args);
	}

}

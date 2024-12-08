package edu.neu.csye6200;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class
Driver {

	@RequestMapping("/")
	String home() {
		return "Hello World!";
	}


	public static void main(String[] args) {
		SpringApplication.run(Driver.class, args);
	}

}
package org.cdwbackend.controller;

import org.cdwbackend.dto.response.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("${API_PREFIX}")
public class Temp {

    @GetMapping("/hello")
    public ResponseObject<Map<String, String>> hello() {
        return new ResponseObject<>(HttpStatus.OK, "Hello World!",
                Map.of("message", "Hello World!",
                        "status", "success"
                ));
    }
}

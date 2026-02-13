package com.hostel.management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to Hostel Management System API! \n" +
                "Use the following endpoints: \n" +
                "- POST /students (Register) \n" +
                "- POST /attendance/mark (Mark Attendance) \n" +
                "- POST /leave/apply (Apply Leave) \n" +
                "- GET /warden/pending-requests (View Requests)";
    }
}

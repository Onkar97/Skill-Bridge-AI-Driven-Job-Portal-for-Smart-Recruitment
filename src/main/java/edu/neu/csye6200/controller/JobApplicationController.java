package edu.neu.csye6200.controller;
import edu.neu.csye6200.dto.JobApplicationRequest;
import edu.neu.csye6200.dto.JobApplicationResponse;
import edu.neu.csye6200.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-application")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<JobApplicationResponse> submitJobApplication(@ModelAttribute JobApplicationRequest jobApplicationRequest) {
        try {
            JobApplicationResponse response = jobApplicationService.processJobApplication(jobApplicationRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new JobApplicationResponse(e.getMessage(), null, null, null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new JobApplicationResponse("Error while submitting job application: " + e.getMessage(), null, null, null));
        }
    }


}


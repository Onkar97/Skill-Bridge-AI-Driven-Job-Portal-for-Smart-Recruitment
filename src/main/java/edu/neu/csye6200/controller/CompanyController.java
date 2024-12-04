package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.CompanyRequestDTO;
import edu.neu.csye6200.dto.CompanyResponseDTO;
import edu.neu.csye6200.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // Endpoint to create or update a company
    @PostMapping
    public ResponseEntity<CompanyResponseDTO> createOrUpdateCompany(@RequestBody CompanyRequestDTO companyRequestDTO) {
        CompanyResponseDTO response = companyService.saveCompany(companyRequestDTO);
        return ResponseEntity.ok(response);
    }

    // Endpoint to get a list of all companies
    @GetMapping
    public ResponseEntity<List<CompanyResponseDTO>> getAllCompanies() {
        List<CompanyResponseDTO> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }
}

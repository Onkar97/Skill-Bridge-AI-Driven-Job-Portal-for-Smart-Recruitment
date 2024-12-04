package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.CompanyRequestDTO;
import edu.neu.csye6200.dto.CompanyResponseDTO;
import edu.neu.csye6200.entity.Company;
import edu.neu.csye6200.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    // Create or update a company
    public CompanyResponseDTO saveCompany(CompanyRequestDTO companyRequestDTO) {
        Company company = new Company();
        company.setName(companyRequestDTO.getName());
        company.setIndustry(companyRequestDTO.getIndustry());

        Company savedCompany = companyRepository.save(company);

        return new CompanyResponseDTO(savedCompany.getId(), savedCompany.getName(), savedCompany.getIndustry());
    }

    // Get a list of all companies
    public List<CompanyResponseDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(company -> new CompanyResponseDTO(
                        company.getId(),
                        company.getName(),
                        company.getIndustry()))
                .collect(Collectors.toList());
    }
}

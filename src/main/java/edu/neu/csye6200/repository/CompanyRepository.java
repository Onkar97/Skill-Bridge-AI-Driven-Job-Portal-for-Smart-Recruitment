package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    // You can add custom queries here if needed, for example:
    // Optional<Company> findByName(String name);
    Company findByName(String name);

}

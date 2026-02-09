package com.unifiedpension.backend.repository;

import com.unifiedpension.backend.entity.Pensioner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface PensionerRepository extends JpaRepository<Pensioner, Long> {

    Optional<Pensioner> findByAadhaarNumber(String aadhaarNumber);

    @Query("select p.aadhaarNumber from Pensioner p group by p.aadhaarNumber having count(p) > 1")
    List<String> findDuplicateAadhaarNumbers();

    List<Pensioner> findByAadhaarNumberIn(List<String> aadhaarNumbers);
}

package com.company.Billing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.company.Billing.entity.Customer;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}

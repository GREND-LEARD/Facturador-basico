package com.company.Billing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.company.Billing.entity.Product;
import org.springframework.stereotype.Repository;

@Repository 
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}

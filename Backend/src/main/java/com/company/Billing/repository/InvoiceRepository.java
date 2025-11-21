package com.company.Billing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.company.Billing.entity.Invoice;
import org.springframework.stereotype.Repository;

@Repository 
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

}

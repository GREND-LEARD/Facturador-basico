package com.company.Billing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.company.Billing.repository.InvoiceRepository;
import com.company.Billing.entity.Invoice;
import java.util.List;
import com.company.Billing.entity.InvoiceItem;
import com.company.Billing.entity.Customer;
import com.company.Billing.entity.Product;
import java.math.BigDecimal;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id:" + id));
    }

    @Transactional
    public Invoice createInvoice(Invoice invoice) {
        Customer customer = customerService.getCustomerById(invoice.getCustomer().getId());
        invoice.setCustomer(customer);

        for (InvoiceItem item : invoice.getItems()) {
            Product product = productService.getProductById(item.getProduct().getId());
            item.setProduct(product);
            item.setInvoice(invoice);
            calculateItemTotals(item);
        }
        calculateInvoiceTotals(invoice);
        return invoiceRepository.save(invoice);
    }

    private void calculateItemTotals(InvoiceItem item) {
        BigDecimal subtotal = item.getUnitPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity()));
        item.setSubtotal(subtotal);

        BigDecimal taxAmount = subtotal
                .multiply(item.getTaxRate())
                .divide(BigDecimal.valueOf(100));
        item.setTaxAmount(taxAmount);

        BigDecimal totalLine = subtotal.add(taxAmount);
        item.setTotalLine(totalLine);
    }

    private void calculateInvoiceTotals(Invoice invoice) {
        BigDecimal totalSubtotal = BigDecimal.ZERO;
        BigDecimal totalTaxes = BigDecimal.ZERO;

        for (InvoiceItem item : invoice.getItems()) {
            totalSubtotal = totalSubtotal.add(item.getSubtotal());
            totalTaxes = totalTaxes.add(item.getTaxAmount());
        }

        invoice.setTotalSubtotal(totalSubtotal);
        invoice.setTotalTaxes(totalTaxes);
        invoice.setTotalInvoice(totalSubtotal.add(totalTaxes));
    }

}

package com.company.Billing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.company.Billing.repository.CustomerRepository;
import com.company.Billing.entity.Customer;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Customer not found with id:" + id));

    } 

    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customerDatails){
        Customer customer = getCustomerById(id);
        customer.setName(customerDatails.getName());
        customer.setIdentification(customerDatails.getIdentification());
        customer.setPhone(customerDatails.getPhone());
        customer.setAddress(customerDatails.getAddress());
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id){
        Customer customer = getCustomerById(id);
        customerRepository.delete(customer);
    }
}

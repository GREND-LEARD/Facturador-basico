package com.company.Billing.service;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.company.Billing.repository.ProductRepository;
import com.company.Billing.entity.Product;
import org.springframework.stereotype.Service;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id:" + id));
    }

    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails){
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setCode(productDetails.getCode());
        product.setUnitPrice(productDetails.getUnitPrice());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id){
        Product product = getProductById(id);
        productRepository.delete(product);
    }


}

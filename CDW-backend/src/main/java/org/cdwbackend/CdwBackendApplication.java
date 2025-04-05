package org.cdwbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class CdwBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CdwBackendApplication.class, args);
    }


    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {


//            List<Product> all = productRepository.findAll();
//            System.out.println("Product count: " + all.size());
//            List<ProductDocument> docs = new ArrayList<>();
//            all.forEach(product -> {
//                docs.add(ProductDocument.builder()
//                        .id(product.getId())
//                        .name(product.getName())
//                        .isDeleted(false)
//                        .build());
//            });
//            productElasticRepo.saveAll(docs);
//            System.out.println("Product count: " + productElasticRepo.count());
        };

    }

}

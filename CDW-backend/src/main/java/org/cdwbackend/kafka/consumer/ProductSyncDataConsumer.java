package org.cdwbackend.kafka.consumer;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.cdwbackend.service.IProductSyncDataService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProductSyncDataConsumer {
    String DEBEZIUM_UPDATE = "u";
    String DEBEZIUM_CREATE = "c";
    String DEBEZIUM_DELETE = "d";
    String DEBEZIUM_READ = "r";
    IProductSyncDataService dataService;

    @KafkaListener(topics = "db.shoes_web.products")
    public void listen(ConsumerRecord<String, JsonNode> record) {
        JsonNode jsonNode = record.value();
        if (jsonNode == null) {
            log.debug("Received tombstone message for key: {}, skipping...", record.key());
            return;
        }

        long id;
        JsonNode payload = jsonNode.path("payload");
        String action = payload.path("op").asText();

        try {
            switch (action) {
                case DEBEZIUM_CREATE, DEBEZIUM_READ:
                    id = Long.parseLong(payload.path("after").path("id").asText());
                    log.info("create or read product with id {}", id);
                    dataService.createProduct(id);
                    break;
                case DEBEZIUM_UPDATE:
                    id = Long.parseLong(payload.path("after").path("id").asText());
                    log.info("update product with id {}", id);
                    dataService.updateProduct(id);
                    break;
                case DEBEZIUM_DELETE:
                    id = Long.parseLong(payload.path("before").path("id").asText());
                    log.info("delete product with id {}", id);
                    dataService.deleteProduct(id);
                    break;
                default:
                    break;
            }
        } catch (NumberFormatException e) {
            log.error("Error parsing ID from JSON: {}", e.getMessage());
        } catch (Exception e) {
            log.error("Error processing message: {}", e.getMessage());
        }
    }
}

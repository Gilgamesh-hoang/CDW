FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy gradle files first for better caching
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Make gradlew executable
RUN chmod +x ./gradlew

# Download dependencies
RUN ./gradlew dependencies

# Copy source code
COPY src src

# Build application
RUN ./gradlew bootJar

# Run application
EXPOSE 9000
CMD ["java", "-jar", "build/libs/CDW-Backend.jar"] 
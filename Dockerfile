# We establish a single-stage runner image because Jenkins runs 'mvn clean package' before building Docker.
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the built jar from the Jenkins pipeline step
COPY target/devpulse-1.0.0.jar app.jar

# Expose the standard port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Use a lightweight Java runtime
FROM eclipse-temurin:17-jdk

# Set the working directory
WORKDIR /app

# Copy the JAR file you just built locally into the image
# This avoids any network/download issues during the build
COPY target/*.jar app.jar

# Expose the port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","app.jar"]
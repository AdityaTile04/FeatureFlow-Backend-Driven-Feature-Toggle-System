FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY target/backend-app.jar backend-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend-app.jar"]
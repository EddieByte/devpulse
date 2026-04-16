# DevPulse

![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-e04326?style=flat-square&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-0db7ed?style=flat-square&logo=docker&logoColor=white)
![AWS EKS](https://img.shields.io/badge/AWS-Elastic_Kubernetes-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![Java](https://img.shields.io/badge/Java_17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-0db7ed?style=flat-square)

**DevPulse** is a full-stack, real-time observability dashboard built with Spring Boot and React. It actively streams live JVM memory usage, system CPU metrics, thread counts, and uptime data dynamically via WebSockets (STOMP/SockJS) without requiring page refreshes.

## 💡 Simple Use Case (For Non-Technical Readers)
Imagine you buy a brand new sports car. While you just want to drive it, the dashboard behind the steering wheel tells you how hot the engine is getting, how much fuel is left, and how fast the car is moving. **DevPulse is that dashboard, but for cloud software.** 

### How It Works
When companies run applications in the cloud, those applications consume memory and processing power. If an application uses too much memory, it crashes. 

Instead of waiting for a crash to happen, **DevPulse** actively monitors the "engine" of its own application (the Java Virtual Machine). It measures its own memory usage, processing load, and active tasks, and securely streams those live numbers directly to your web browser—updating every 2 seconds without you ever needing to click refresh. 

For a developer or DevOps engineer, deploying DevPulse serves as a "living resume." It proves they know how to build, secure, deploy, and monitor complex software systems autonomously in a professional cloud environment.

## 🚀 DevOps & CI/CD Architecture
This application is purposefully designed to showcase a mature **DevSecOps** pipeline deployed on **AWS Elastic Kubernetes Service (EKS)**. 

### Key Infrastructure Highlights
- **Continuous Integration (Jenkins):** Automates the entire compilation of both the Vite frontend and Spring Boot backend `jar`.
- **Code Quality & Security:** Enforces a SonarQube Quality Gate and halts deployments if `Trivy` detects `HIGH` or `CRITICAL` Docker vulnerabilities.
- **Advanced Ingress (AWS ALB):** Showcases complex Kubernetes networking by configuring ALB sticky sessions to ensure the real-time WebSocket connection remains extremely stable across multiple EKS pods.
- **Continuous Deployment (ArgoCD):** Automatically detects `eddiebyte/devpulse:latest` pushes on DockerHub and executes zero-downtime rolling updates inside the Kubernetes cluster.

## 🛠️ Local Development
To run this application locally:
```bash
# Build the unified JAR (Frontend + Backend)
mvn clean package -DskipTests

# Run the application
java -jar target/devpulse-1.0.0.jar
```
*The dashboard will be available at `http://localhost:8080`.*

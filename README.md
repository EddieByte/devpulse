# DevPulse

![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-e04326?style=flat-square&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-0db7ed?style=flat-square&logo=docker&logoColor=white)
![AWS EKS](https://img.shields.io/badge/AWS-Elastic_Kubernetes-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-ef7b4d?style=flat-square&logo=argo-cd&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61DAFB)

**DevPulse** is a full-stack, real-time observability dashboard built with Spring Boot and React. It actively streams live JVM memory usage, system CPU metrics, thread counts, and uptime data dynamically via WebSockets (STOMP/SockJS) without requiring page refreshes.

## 💡 Simple Use Case (For Non-Technical Readers)
Imagine you buy a brand new sports car. While you just want to drive it, the dashboard behind the steering wheel tells you how hot the engine is getting, how much fuel is left, and how fast the car is moving. **DevPulse is that dashboard, but for cloud software.** ### How It Works
When companies run applications in the cloud, those applications consume memory and processing power. Instead of waiting for a crash to happen, **DevPulse** actively monitors the "engine" of its own application (the Java Virtual Machine). It measures its own memory usage and processing load and securely streams those live numbers directly to your web browser—updating every 2 seconds automatically.

---

## 🚀 GitOps & CI/CD Architecture
This project implements a **Zero-Touch Autopilot** deployment strategy using a dual-repository GitOps pattern.

### 📁 Repository Architecture
To maintain professional DevSecOps standards, the project is split into two specialized repositories:
* **[Application Repo](https://github.com/EddieByte/devpulse):** Source code, Unit Tests, and CI Pipeline definition.
* **[Manifest Repo](https://github.com/EddieByte/devpulse-manifests):** Kubernetes infrastructure state managed via Kustomize.

### ⚙️ The Automation Loop
1.  **Continuous Integration (Jenkins):** Triggered by a GitHub Webhook, Jenkins compiles the code, runs SonarQube analysis, and performs a **Trivy Vulnerability Scan**.
2.  **The GitOps Bridge:** Upon a successful build, Jenkins uses `kustomize` to update the image tag in the **Manifest Repo**. This creates a permanent audit trail of every deployment in Git.
3.  **Continuous Deployment (ArgoCD):** ArgoCD detects the manifest change and executes a **Rolling Update** on the AWS EKS cluster, ensuring zero downtime.

---

## 🛠️ Kubernetes Deployment Structure
We use **Kustomize** to manage environment-specific configurations cleanly:

```text
devpulse-manifests/
├── base/                   # Core Kubernetes objects
│   ├── deployment.yaml     # 3 Replicas with resource limits
│   ├── service.yaml        # Internal ClusterIP
│   └── ingress.yaml        # External Access via AWS ALB
└── overlays/               
    └── dev/                # Development environment
        └── kustomization.yaml # Jenkins updates the image tag here
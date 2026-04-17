pipeline {
    agent { label 'Jenkins-Agent' }

    tools {
        jdk 'Java21'
        maven 'Maven3'
    }

    environment {
        APP_NAME    = "devpulse"
        RELEASE     = "1.0.0"
        IMAGE_NAME  = "eddiebyte/${APP_NAME}"
        IMAGE_TAG   = "${RELEASE}-${BUILD_NUMBER}"
        // Keeping 0.69.3 for security (verified safe version)
        TRIVY_IMAGE = "aquasec/trivy:0.69.3" 
    }

    stages {
        stage("Cleanup Workspace") {
            steps { cleanWs() }
        }

        stage("Checkout from SCM") {
            steps {
                git branch: 'main',
                    credentialsId: 'github',
                    url: 'https://github.com/EddieByte/devpulse'
            }
        }

        stage("Build & Test") {
            steps {
                sh "mvn clean package"
                sh "mvn test"
            }
        }

        stage("SonarQube Analysis") {
            steps {
                script {
                    withSonarQubeEnv('sonarqube-server') {
                        sh "mvn sonar:sonar"
                    }
                    timeout(time: 2, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }

        stage("Docker Build") {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage("Trivy Scan") {
            steps {
                script {
                    sh """
                        docker run --rm \
                            -e DOCKER_API_VERSION=1.44 \
                            -v /var/run/docker.sock:/var/run/docker.sock \
                            ${TRIVY_IMAGE} image \
                            --severity HIGH,CRITICAL \
                            --exit-code 0 \
                            ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage("Docker Login & Push") {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'DockerHub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                            docker push ${IMAGE_NAME}:${IMAGE_TAG}
                            docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                            docker push ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage("Update Manifests") {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'github',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_PASS'
                    )]) {
                        sh """
                            # Ensure a clean state by removing any existing directory
                            rm -rf devpulse-manifests
                            
                            # Clone the manifest repository
                            git clone https://github.com/EddieByte/devpulse-manifests.git
                            cd devpulse-manifests/overlays/dev
                            
                            # Update the image tag in kustomization.yaml
                            kustomize edit set image ${IMAGE_NAME}=${IMAGE_NAME}:${IMAGE_TAG}
                            
                            # Push changes back to the manifest repo
                            git config user.email "jenkins@devpulse.com"
                            git config user.name "Jenkins CI"
                            git add kustomization.yaml
                            git commit -m "Update dev image to ${IMAGE_TAG} [skip ci]"
                            
                            # Use credentials for the push
                            git push https://\$GIT_USER:\$GIT_PASS@github.com/EddieByte/devpulse-manifests.git main
                        """
                    }
                }
            }
        }

        stage('Cleanup Artifacts') {
            steps {
                script {
                    // Using "|| true" ensures the pipeline doesn't fail if the image was already cleaned
                    sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true"
                    sh "docker rmi ${IMAGE_NAME}:latest || true"
                }
            }
        }
    }
}

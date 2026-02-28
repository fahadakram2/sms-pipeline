pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    stages {
        stage('Checkout Code') {
            steps{
                checkout scm
            }
        }

        stage('Install Dependency') {
            steps{
                dir('backend'){
                    bat 'npm install'
                }

                dir('frontend'){
                    bat 'npm install'
                }
                
            }
        }

        stage('Run Test') {
            steps{
                dir('backend'){
                    echo 'Backend Tests'
                }

                dir('frontend'){
                    echo 'Frontend Tests'
                }
            }
        }

        stage('Security Audit') {
            steps {
                dir('backend'){
                    bat 'npm audit --audit-level=critical'
                }
                dir('frontend'){
                    bat 'npm audit --audit-level=critical'
                }
            }
        }

        stage('SAST') {
            steps {
                withSonarQubeEnv(MySonarQubeServer){
                    bat """
                    sonar-scanner ^
                      -D"sonar.projectKey=sms-pipeline"
                      -Dsonar.sources=. ^
                      -Dsonar.host.url=%SONAR_HOST_URL%
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'pipeline finished.'
        }
        success {
            echo 'pipeline suceess.'
        }
        failure {
            echo 'pipeline failed.'
        }
    }
}
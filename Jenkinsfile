pipeline {
    agent any

    tools {
        nodejs 'NodeJs'
    }

    environment {
            SONAR_SCANNER_HOME = tool 'SonarQube-Scanner-600'
    }

    stages {
        stage('Checkout Code') {
            steps{
                checkout scm
            }
        }

        stage('Install Dependency') {
            parallel {
                stage('Backend Dependency Install') {
                    steps {
                        dir('backend'){
                            bat 'npm install'
                        }
                    }
                }
                stage('Frontend Dependency install'){
                    steps {
                        dir('frontend'){
                            bat 'npm install'
                        }
                    }
                    
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
                withSonarQubeEnv('MySonarQubeServer'){
                    bat """
                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner ^
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
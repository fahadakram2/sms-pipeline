pipeline {
    agent any 

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        stage("install dependency") {
            steps{
                sh 'npm install'
            }
        }
    }
}
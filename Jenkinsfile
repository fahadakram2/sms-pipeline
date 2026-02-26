pipeline {
    agent any 

    stages {
        stage("Checkout") {
            steps {
                Checkout scm
            }
        }
        stage("install dependency") {
            steps{
                sh 'npm install'
            }
        }
    }
}
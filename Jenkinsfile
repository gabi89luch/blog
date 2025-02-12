pipeline {
    agent any
    
    tools {
        terraform 'terraform'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Verify Structure') {
            steps {
                sh '''
                    echo "Checking directory structure..."
                    test -d css || exit 1
                    test -d js || exit 1
                    test -d terraform || exit 1
                    test -f index.html || exit 1
                    test -f css/styles.css || exit 1
                    test -f js/script.js || exit 1
                    test -f terraform/main.tf || exit 1
                '''
            }
        }
        
        stage('Lint HTML') {
            steps {
                sh '''
                    echo "Installing htmlhint..."
                    npm install -g htmlhint
                    echo "Linting HTML..."
                    htmlhint *.html
                '''
            }
        }
        
        stage('Terraform Format Check') {
            steps {
                dir('terraform') {
                    sh 'terraform fmt -check -recursive'
                }
            }
        }
        
        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init -backend=false'
                }
            }
        }
        
        stage('Terraform Validate') {
            steps {
                dir('terraform') {
                    sh 'terraform validate'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Verification completed successfully!'
        }
        failure {
            echo 'Verification failed!'
        }
        always {
            cleanWs()
        }
    }
}

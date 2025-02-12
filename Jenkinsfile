pipeline {
    agent any
    
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
                    test -d posts || exit 1
                    test -f index.html || exit 1
                    test -f css/main.css || exit 1
                    test -f css/posts.css || exit 1
                    test -f js/main.js || exit 1
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
        
        stage('Terraform Checks') {
            steps {
                sh '''
                    # Install Terraform if not present
                    if ! command -v terraform &> /dev/null; then
                        echo "Installing Terraform..."
                        sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl
                        curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
                        sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
                        sudo apt-get update && sudo apt-get install -y terraform
                    fi
                    
                    cd terraform
                    terraform init -backend=false
                    terraform validate
                    terraform fmt -check -recursive
                '''
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

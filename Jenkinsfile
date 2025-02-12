pipeline {
    agent any

    tools {
        terraform 'terraform'
    }

    environment {
        GITHUB_TOKEN = credentials('GITHUB_TOKEN')
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
                    sudo npm install -g htmlhint -y
                    echo "Linting HTML..."
                    htmlhint *.html
                '''
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    sh 'terraform plan -out=tfplan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }
    }

    post {
        cleanup {
            cleanWs()
        }
    }
}

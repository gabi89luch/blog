pipeline {
    agent any

    tools {
        terraform 'terraform'
    }

    environment {
        TF_VAR_github_token = credentials('GITHUB_TOKEN')
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
                    echo "Linting HTML..."
                    htmlhint index.html
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

        stage('Terraform Import') {
            steps {
                dir('terraform') {
                    sh '''
                        terraform import github_repository.blog blog || true
                    '''
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    sh 'terraform plan -var="github_token=${TF_VAR_github_token}" -out=tfplan'
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

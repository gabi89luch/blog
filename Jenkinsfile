pipeline {
    agent any
    
    environment {
        GH_PAGES_BRANCH = 'gh-pages'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Lint HTML') {
            steps {
                sh 'npm install -g htmlhint'
                sh 'htmlhint *.html'
            }
        }
        
        stage('Deploy to GitHub Pages') {
            steps {
                script {
                    sh """
                        git checkout -B \${GH_PAGES_BRANCH}
                        git add .
                        git commit -m "Deploy to GitHub Pages"
                        git push origin \${GH_PAGES_BRANCH} --force
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Successfully deployed to GitHub Pages!'
        }
        failure {
            echo 'Failed to deploy to GitHub Pages'
        }
    }
}

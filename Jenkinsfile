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
                    test -f index.html || exit 1
                    test -f css/main.css || exit 1
                    test -f css/posts.css || exit 1
                    test -f js/main.js || exit 1
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

pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node:8-alpine'
    }
    
  }
  stages {
    stage('Build npm') {
      steps {
        sh 'npm install'
      }
    }
    stage('angular build') {
      steps {
        sh 'ng build --prod --base-href=graphvizapp'
      }
    }
  }
}
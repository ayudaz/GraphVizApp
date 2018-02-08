pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
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
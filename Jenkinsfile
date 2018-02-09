pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'trion/ng-cli'
    }
    
  }
  stages {
    stage('npm install') {
      steps {
        sh 'npm install'
      }
    }
    stage('build angular app') {
      steps {
        sh 'ng build --prod --base-href=graphvizapp'
      }
    }
  }
}
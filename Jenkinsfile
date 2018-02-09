pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'trion/ng-cli'
    }
    
  }
  stages {
    stage('angular build') {
      steps {
        sh 'ng build --prod --base-href=graphvizapp'
      }
    }
  }
}
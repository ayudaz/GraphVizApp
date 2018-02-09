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
        sh 'ng build --prod --base-href=graphvizapp'
      }
    }
    stage('build angular app') {
      steps {
        docker build -t graphvizapp.
        docker tag graphvizapp ayudaz/graphvizapp
        docker push ayudaz/graphvizapp
      }
    }
  }
}

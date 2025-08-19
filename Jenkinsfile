pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      agent any
      steps {
        echo 'Hi'
        git(url: 'https://github.com/Yeshwanth-kr/jobmatch-ai', branch: 'main')
      }
    }

  }
}
pipeline {
    agent any
    environment{
        DOCKER_TAG = getDockerTag()
    }
    stages{
        stage('Build Docker Image'){
            steps{
                
                    sh "docker build . -t hoang000147/socketdemo:${DOCKER_TAG} "
                
            }
        }
        stage('DockerHub Push'){
            steps{
                withCredentials([string(credentialsId: 'docker-hub', variable: 'dockerHubPwd')]) {
                    sh "docker login -u hoang000147 -p ${dockerHubPwd}"
                    sh "docker push hoang000147/socketdemo:${DOCKER_TAG}"
               }
            }
        }
        stage('Deploy to k8s'){
            steps{
                sh "chmod -R 777 changeTag.sh"
                sh "./changeTag.sh ${DOCKER_TAG}"
                sshagent(['vcntt']) {
                    sh "ssh vcntt@112.137.141.18 kubectl get namespace"
                    sh "scp -o StrictHostKeyChecking=no socketdemo-deploy.yaml vcntt@112.137.141.18:~/socketdemo/"
                    script{
                        try{
                            sh "ssh vcntt@112.137.141.18 kubectl apply -f ~/socketdemo/socketdemo-deploy.yaml"
                        }catch(error){
                            sh "ssh vcntt@112.137.141.18 kubectl create -f ~/socketdemo/socketdemo-deploy.yaml"
                        }
                    }
                }
            }
        }
    }
}

def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}

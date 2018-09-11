timestamps {
    node {
        def mainProjectName = "apiserveraccounting"
        stage('1.Preparation') {
            bat 'START taskkill /f /im chrome.exe'
            gitDeleteLocalFolderAndClone(mainProjectName,mainProjectName)
        }
        stage('2.PreBuild') {
            nodeRun(mainProjectName,"npm config set registry https://registry.npmjs.org/")
            nodeRun(mainProjectName,"npm install --scripts-prepend-node-path")
            nodeRun(mainProjectName,"npm run rebuild:context:win --scripts-prepend-node-path")
            nodeRun(mainProjectName,"npm run build:win --scripts-prepend-node-path")
        }
        stage('3.Test') {
            nodeStartRun("${mainProjectName}/dist","node app.js")
            nodeRun(mainProjectName,"npm run test --scripts-prepend-node-path")
            nodeRun(mainProjectName,"npm run duplicated --scripts-prepend-node-path")
            nodeRun(mainProjectName,"npm run genswagger --scripts-prepend-node-path")
            nodeRun(mainProjectName,"npm run dredd --scripts-prepend-node-path")
            //nodeRun(mainProjectName,"npm run sonar --scripts-prepend-node-path")
        }
        stage('4.Prune') {
            bat 'taskkill /f /im node.exe'
            dir (mainProjectName) {
                def tsconfigJson = readFile file:'tsconfig.json'
                def ConfigApp = readFile file:'src/config/config.app.ts'
                writeFile file: 'tsconfig.json', text: tsconfigJson.replace('"removeComments": false,','"removeComments": true,')
            }  
            nodeRun(mainProjectName,"node-prune")
            nodeRun("${mainProjectName}/mock","npm install --scripts-prepend-node-path")
        }  
        stage('5.npm version') {
            echo projectVersion
            if (projectVersion != '') {
                bat 'git config --global user.name "Jenkins"'
                bat 'git config --global user.email Jenkins@gamasys.com.tw'
                dir (mainProjectName) {
                    bat 'git checkout .'
                    nodeRun(mainProjectName,"npm version ${projectVersion}")
                }
            }
        }    
        stage('6.ReplaceData1') {
            dir (mainProjectName) {
                def packageJson = readJSON file:'package.json'
                def file = readFile 'setup/GCMS_API_Service.iss'
                def exeVersion = "${packageJson.version}_${BUILD_NUMBER}"
                def swagger = readYaml file:'mock/api/swagger.yaml'
                def test = "${swagger.host}"
                def test1 = "'"+"${test}"+"'"
                def IP = "${IP}"
                def fileTXT = readFile encoding: 'UTF-8', file:'mock/api/swagger.yaml'
                packageJson.buildnumber = "${BUILD_NUMBER}".toString()
                writeJSON file: 'package.json', json: packageJson
                writeFile file: 'setup/GCMS_API_Service.iss', text: file.replace('#define AppVersion "1.0.0"','#define AppVersion "'+exeVersion+'"')
                writeFile encoding: 'UTF-8', file: 'mock/api/swagger.yaml', text: fileTXT.replace('host: '+test1+'','host: '+IP+'')
            }
        }
        stage('7.ReplaceData2') {
            dir (mainProjectName) {
                def packageJson = readJSON file:'package.json'
                def exeVersion = "${packageJson.version}_${BUILD_NUMBER}"
                def swagger = readYaml file:'mock/api/swagger.yaml'
                def version = "${swagger.info.version}"
                def fileTXT = readFile encoding: 'UTF-8', file:'mock/api/swagger.yaml'
                writeFile encoding: 'UTF-8', file: 'mock/api/swagger.yaml', text: fileTXT.replace('version: '+version+'','version: '+exeVersion+'')
            }    
        }
        stage('8.PostBuild') {
        	bat 'iscc "/O" /Qp apiserveraccounting/setup/GCMS_API_Service.iss'
        }
        stage('9.ArchiveArtifacts') {
        	archiveArtifacts 'apiserveraccounting/setup/Release/*.exe'
        }
        stage('10.Send archiveArtifacts to FTP Server') {
            sentToFTP("${JOB_NAME}"+'/')
        }
        stage('11.Coverage Report') {
            publishHTML([allowMissing: false,
     	    alwaysLinkToLastBuild: false,
            keepAll: true,
     	    reportDir: 'apiserveraccounting/coverage/lcov-report/',
     	    reportFiles: 'index.html',
     	    reportName: 'coverage report'])
        }
        stage('12.Dredd Report') {
            publishHTML([allowMissing: false,
     	    alwaysLinkToLastBuild: false,
            keepAll: true,
     	    reportDir: '',
     	    reportFiles: 'apiserveraccounting/report.html',
     	    reportName: 'Dredd Report'])
        }
    }
}
def gitDeleteLocalFolderAndClone(folderName,gitName) {
    dir(folderName) {
        deleteDir()
    }
    dir (folderName) {
        git branch: "${gitBranch}", credentialsId: '3082afe4-aeee-44cc-bb2b-19500c424dd2', url: 'http://jenkins@bitbucket.gamasys.com.tw:7990/scm/g3/'+gitName+'.git'
    }
}
def nodeRun(folderName,buildCmd) {
    def nodeHome = tool 'GCMS3 APIServer NodeJS'
    dir (folderName) {
        bat(/"${nodeHome}\"${buildCmd}/)
    }
}
def nodeStartRun(folderName,buildCmd) {
    def nodeHome = tool 'GCMS3 APIServer NodeJS'
    dir (folderName) {
        bat('Start /b "APIServerAccounting" '+/"${nodeHome}\"${buildCmd}/)
    }
}
def sentToFTP(toFilePath) {
    def ftpAddress = "192.168.122.144 20"
    def ftpUser = "name"
    def ftpPwd = "password"
    def deployFilePath = "apiserveraccounting/setup/Release/*.exe"
        bat '''@echo off
                echo open '''+ftpAddress+'''>> ftpcmd.dat
                echo user '''+ftpUser+'''>> ftpcmd.dat
                echo '''+ftpPwd+'''>> ftpcmd.dat
                echo bin>> ftpcmd.dat
                echo mkdir '''+toFilePath+''' >> ftpcmd.dat
                echo cd '''+toFilePath+''' >> ftpcmd.dat
                echo put '''+deployFilePath+'''>> ftpcmd.dat
                echo bye>> ftpcmd.dat
                ftp -n -s:ftpcmd.dat
                del ftpcmd.dat'''
}


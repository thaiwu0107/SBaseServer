var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');
 
gulp.task('sonar', function(callback) {
  sonarqubeScanner({
    serverUrl: "http://192.168.122.108:9001/",
    options: {
      "sonar.sources": "src",
      "sonar.tests": "test",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.exclusions": "src/context/**.*,src/tools/**.*",
      "sonar.coverage.exclusions": "src/context/**.*,src/config/**.*,src/sqlTemplate,src/tools/**.*,src/app.ts,src/models/**.*"
    }
  }, callback);
});
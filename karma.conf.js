// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    singleRun: true,
    browser: ['PhantomJS'],
    colors: true,
    port: 8080,
    runnerPort: 9100,
    autoWatch: false,
    reporters: ['progress'],
    files: [
      'bower_components/jquery/dist/jquery.js', 
      'bower_components/angular/angular.js', 
      'bower_components/angular-mocks/angular-mocks.js', 
      'src/*.js', 
      'test/spec/*.js'
      ]
  });
};
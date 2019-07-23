'use strict';
const fs = require('fs');
 
// Get all test specification files from directory
var testFiles = fs.readdirSync(__dirname + '/test-specs');
 
// Setup-code - Do this one time before any test suite started  
var randomNumber = math.random();
 
// Require all the tests and supply with the same random number
testFiles.forEach(function (file) {
  require('./test-specs/' + file)(randomNumber);
});
 
// Mocha command to run tests
run();
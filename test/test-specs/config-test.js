'use strict';

const expect = require('chai').expect;
var config = require('./source/config');

module.exports = function (randomNumber) {
    describe('A test to check envriroment settings', function () {
        it('Should equal 0', function (done) {
            let result = config.environmentVariables(platform);
            console.log(result);
            
        });
    });
};
var path = require('path'),
    fs = require('fs'),
    whatmd = require('../src/whatmd');

exports.testGlobal = function (test) {
    var findings = whatmd.probeGlobal(fs.readFileSync(path.join(__dirname, 'subjects/global.js')));

    test.expect(1);

    console.log(findings);

    test.ok(true, 'this assertion should pass');

    test.done();
};

exports.testCommonJs = function (test) {
    var findings = whatmd.probeCommonJs(fs.readFileSync(path.join(__dirname, 'subjects/commonJs.js')));

    test.expect(1);

    console.log(findings);

    test.ok(true, 'this assertion should pass');

    test.done();
};

exports.testAmd = function (test) {
    var findings = whatmd.probeAmd(fs.readFileSync(path.join(__dirname, 'subjects/amd.js')));

    test.expect(1);

    console.log(findings);

    test.ok(true, 'this assertion should pass');

    test.done();
};

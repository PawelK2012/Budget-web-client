exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo-spec.js'],
    capabilities: {
        browserName: 'chrome',
    },
    jasmineNodeOpts: {
        showColors: true
    }
};


// exports.config = {
//   framework: 'jasmine',
//   seleniumAddress: 'http://localhost:4444/wd/hub',
//   specs: ['todo-spec.js'],
//   multiCapabilities: [{
//     //browserName: 'firefox'
//   }, {
//     browserName: 'chrome'
//   }]
// }

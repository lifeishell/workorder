var path = require('path');
var fs = require('fs');
module.exports =function getEntries() {
    var matches;
    var files = {};
    var modules = path.resolve(__dirname, './src/modules/');
    var routers = path.resolve(__dirname, './src/routers');
    var dirs = fs.readdirSync(modules);

    dirs.forEach(function(item, index) {
        var filesDir = fs.readdirSync(routers);
        filesDir.forEach(function(val, index) {
            matches = /(.+)\.js$/g.test(val);
            if (matches) {
                var prname = val.split('.')[0];
                files[prname] = path.resolve(routers, val);
            }
        });
    });

    console.log(files);
    return files;
};
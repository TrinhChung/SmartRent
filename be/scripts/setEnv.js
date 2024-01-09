const fs = require("fs");
const envfile = require("envfile");
var path = require("path");
const pathToenvFile = path.join(__dirname, "../.env");

function setEnv(key, value) {
  fs.readFile(pathToenvFile, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = envfile.parse(data);
    result[key] = value;
    fs.writeFile(pathToenvFile, envfile.stringify(result), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
}
module.exports = { setEnv: setEnv };

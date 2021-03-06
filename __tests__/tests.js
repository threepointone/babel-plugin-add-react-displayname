var babel = require("babel-core");
var fs = require("fs");
var path = require("path");
var fixturesDir = path.join(__dirname, "fixtures");

var pluginPath = path.join(
  __dirname,
  "../../babel-plugin-add-react-displayname"
);
var assert = require("assert");
describe("add-react-displayname transform", function() {
  fs.readdirSync(fixturesDir).forEach(function(fixture) {    
    var actual = transformFile(path.join(fixturesDir, fixture, "input.js"));
    it("transforms " + path.basename(fixture), function() {
      expect(actual).toMatchSnapshot();
    });
  });
});

function readFile(filename) {
  var file = fs.readFileSync(filename, "utf8").trim();
  file = file.replace(/\r\n/g, "\n");
  return file;
}

function transformFile(filename) {
  return babel.transformFileSync(filename, {
    presets: ["react", "stage-1"],
    plugins: [
      [
        pluginPath,
        { knownComponents: ["Component5a", "Component5b", "Component5c"] }
      ],
      "transform-decorators-legacy"
    ]
  }).code;
}

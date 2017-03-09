'use strict';

var fs = require('fs');
var webshot = require('webshot');
var mustache = require('mustache');

var image = '/tmp/teams.png';

function getTemplateDir(teams) {
	if (teams.team1.length >=3 && teams.team1.length <= 4) {
		return 'html/template34/';
	} else if (teams.team1.length === 5) {
		return 'html/template5/';
	} else {
		console.log('WTF are these teams !!!!! I got no template for that');
	}
}

module.exports.generateImage = function(teams) {
	var templateDir = getTemplateDir(teams);
  var template = fs.readFileSync(templateDir + 'template.html', 'utf8');
  var rendered = mustache.render(template, {team1: teams.team1, team2: teams.team2, className: function() {
    var index1 = teams.team1.indexOf(this);
    var index2 = teams.team2.indexOf(this);
    return index1 >= 0 ? 'poste1_' + index1  : 'poste2_' + index2;
  }});
	var generatedFilePath = templateDir + 'generated.html';
  fs.writeFileSync(generatedFilePath, rendered);

	var generatedFileUrl = __dirname + generatedFilePath;
  webshot(generatedFileUrl, image, {siteType:'url', shotSize:{ width: 360, height: 530 }}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success!', image);
    }
  });
};

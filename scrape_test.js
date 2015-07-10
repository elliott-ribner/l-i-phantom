var fs = require("fs");
var schools = require('./sample.json');
var webPage = require('webpage');
var page = webPage.create();
var similarSchoolBlock;
var outputArray = [];

var schoolArray = JSON.parse(JSON.stringify(schools));
console.log(JSON.stringify(schoolArray));

for(var prop in schoolArray){
  var school = JSON.parse(JSON.stringify(schoolArray[prop]));
  console.log(school.url);
  logPage(school.name, school.url);
};



function logPage(schoolName, schoolUrl ) {
  page.open('https://www.linkedin.com/edu/school?id=18753&trk=tyah&trkInfo=clickedVertical%3Aschool%2Cidx%3A3-1-9%2CtarId%3A1436230271851%2Ctas%3Amontana%20state', function(status){
  	similarSchoolBlock = page.evaluate(function(){
  		return document.querySelector('.similar-schools').innerHTML;
  	});
  	
  	var tempJson = {
      "name": schoolName,
      "linked_in_html": similarSchoolBlock
    };
    outputArray.push(tempJson);
    //needs to be moved outside of this method
    var path = 'school_html_block.json';
    fs.write( path, JSON.stringify(tempJson, undefined, 2), function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });
    //
  	phantom.exit();
  });	

};



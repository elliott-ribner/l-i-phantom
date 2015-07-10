var fs = require("fs");
var schools = require('./sample.json');
var webPage = require('webpage');
var page = webPage.create();
var similarSchoolBlock;
var outputArray = [];
var i = 0;
// var schoolA =  ['1','2','3'];
var schoolArray = JSON.parse(JSON.stringify(schools));
console.log(JSON.stringify(schoolArray));

function logPage(schoolObject){
	page.open('https://www.linkedin.com/edu/school?id=18753&trk=tyah&trkInfo=clickedVertical%3Aschool%2Cidx%3A3-1-9%2CtarId%3A1436230271851%2Ctas%3Amontana%20state', function(status){
		similarSchoolBlock = page.evaluate(function(){
			return document.querySelector('.similar-schools').innerHTML;
		});
		console.log(similarSchoolBlock);
	});	
};

function nextPage() {
	var school = JSON.parse(JSON.stringify(schoolArray[i]));
	if(!school){ phantom.exit(0); }
	i++;
	console.log(school);
   	logPage(school);
};


nextPage();
var cheerio = require("cheerio");
var fs = require("fs");
var tempArray = [];
var masterArray = [];
var schoolArray = [];
var schoolHtmlList = require('./total_html_list.json');
var schoolObject;
var path = 'similar_school_list.json';



for (var i = 0; i < schoolHtmlList.length; i++) {
	var similarSchoolBlock = schoolHtmlList[i].linked_in_html;
	


	if (similarSchoolBlock != null) {
		var $ = cheerio.load(similarSchoolBlock);
		$('li').each(function() { 
			var schoolName = $(this).find('h4').text();
			var schoolLocation = $(this).find('span').text();
			console.log(schoolName);
			console.log(schoolLocation);
			var school = {
				name: schoolName,
				location: schoolLocation
			}
			tempArray.push(school);
		});
		var schoolName = schoolHtmlList[i].name ;
		console.log(schoolName + " is parent");
		var schoolMaster = { schoolName : tempArray }
		masterArray.push(schoolMaster);
		tempArray = [];
	}
	
	if ( i === schoolHtmlList.length - 1 ) {
		fs.writeFile( path, JSON.stringify(masterArray, undefined, 2), function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
	}
};




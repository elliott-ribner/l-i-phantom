var webPage = require('webpage');
var page = webPage.create();
var similarSchoolBlock;

var schoolArray = 
{
  "1200": {
    "url": "https://www.linkedin.com/edu/nyack-college-18998", 
    "citystate": "Nyack, NY", 
    "name": "Nyack College"
  }, 
  "344": {
    "url": "https://www.linkedin.com/edu/concordia-university-wisconsin-19670", 
    "citystate": "Mequon, WI", 
    "name": "Concordia University Wisconsin"
  }
};

console.log(schoolArray)
// page.open('https://www.linkedin.com/edu/school?id=18753&trk=tyah&trkInfo=clickedVertical%3Aschool%2Cidx%3A3-1-9%2CtarId%3A1436230271851%2Ctas%3Amontana%20state', function(status){
	
// 	similarSchoolBlock = page.evaluate(function(){
// 		 return document.querySelector('.similar-schools').innerHTML;

// 	});
	
// 	console.log(similarSchoolBlock);
// 	phantom.exit();
// });	
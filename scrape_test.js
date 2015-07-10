var fs = require("fs");
var schools = require('./sample.json');
var webPage = require('webpage');
var page = webPage.create();
var similarSchoolBlock;
var temporaryArray = [];
var outputArray = [];
var i = 0;
var schoolArray = JSON.parse(JSON.stringify(schools));
// console.log(JSON.stringify(schoolArray));
for(var prop in schoolArray){
  var school = JSON.parse(JSON.stringify(schoolArray[prop]));
  console.log(school.url);
  console.log(school.name);
  temporaryArray.push([school.name, school.url])
};


function logPage(schoolName, schoolUrl) {
  similarSchoolBlock = '';
  page.open(schoolUrl, function(status){
    console.log(status);
    console.log("test");
    if (status == 'success') {
      similarSchoolBlock = page.evaluate(function(){
        return document.querySelector('.similar-schools').innerHTML;
      });
    };

    var tempJson = {
      "name": schoolName,
      "linked_in_html": similarSchoolBlock
    };
    outputArray.push(tempJson);

    setTimeout(function(){
      i++;
      if (i < temporaryArray.length) {
        nextPage(i);
      } else {
      var path = 'school_html_block.json';
      fs.write( path, JSON.stringify(outputArray, undefined, 2), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      });
        phantom.exit();
      }
    }, 10000)

  }); 


};

function nextPage(i) {
  var schoolName = temporaryArray[i][0];
  var schoolUrl = temporaryArray[i][1];
  logPage(schoolName, schoolUrl);
};



nextPage(i);
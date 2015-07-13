var fs = require("fs");
var schools = require('./sample.json');
var webPage = require('webpage');
var page = webPage.create();
var similarSchoolBlock;
var temporaryArray = [];
var outputArray = [];
var i = 0;
var schoolArray = JSON.parse(JSON.stringify(schools));
var path = 'school_html_block.json';

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
    console.log(schoolName);
    if (status == 'success') {
      similarSchoolBlock = page.evaluate(function(){
        return document.querySelector('.similar-schoos').innerHTML;
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
        if (i % 20 === 0) {
          fs.write( path, JSON.stringify(outputArray, undefined, 2), function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
          });
        };
        nextPage(i);
      } else {
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
var cheerio = require("cheerio");
var fs = require("fs");
var tempArray = [];
var schoolArray = [];


var similarSchoolBlock = '<h3 class="module-header">Similar universities<a href="#similar-schools-description" class="hovercard-trigger" role="button" aria-haspopup="true" data-edu-hover-trk="edu-cp-similar-sch-help-hover" id="control_gen_7"><span aria-hidden="true" class="glyph"></span><span class="more-info"> More info</span></a><script id="controlinit-dust-server-39229686-1" type="text/javascript+initialized" class="li-control">LI.Controls.addControl("control-dust-server-39229686-1","BalloonCallout",{orientation:"bottom",type:"hovercard-callout"})</script><script type="text/javascript">if(dust&&dust.jsControl){if(!dust.jsControl.flushControlIds){dust.jsControl.flushControlIds="";}else{dust.jsControl.flushControlIds+=",";}dust.jsControl.flushControlIds+="control-dust-server-39229686-1";}</script><div id="similar-schools-description" class="callout-container"><div class="callout-content"><div class="callout-head"><h3>Similar universities</h3></div><div class="callout-body"><p>These universities have alumni with similar careers.</p></div></div></div></h3><ul class="entity-list"><li><a href="http://www.linkedin.com/edu/school?id=19361&amp;trk=edu-cp-similar-sch-logo" class="entity-link"><img class=" img-defer-hidden" alt="Clemson University" width="60" height="60" src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/4/005/044/1b5/1d29739.png" data-li-src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/4/005/044/1b5/1d29739.png"></a><div class="details"><h4 class="title"><a href="http://www.linkedin.com/edu/school?id=19361&amp;trk=edu-cp-similar-sch-link" title="Clemson University">Clemson University</a></h4><span class="subtitle" title="Greenville, South Carolina Area">Greenville, South Carolina Area</span></div></li><li><a href="http://www.linkedin.com/edu/school?id=19657&amp;trk=edu-cp-similar-sch-logo" class="entity-link"><img class=" img-defer-hidden" alt="University of Washington" width="60" height="60" src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/8/005/092/3a4/2fe285e.png" data-li-src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/8/005/092/3a4/2fe285e.png"></a><div class="details"><h4 class="title"><a href="http://www.linkedin.com/edu/school?id=19657&amp;trk=edu-cp-similar-sch-link" title="University of Washington">University of Washington</a></h4><span class="subtitle" title="Greater Seattle Area">Greater Seattle Area</span></div></li><li><a href="http://www.linkedin.com/edu/school?id=17995&amp;trk=edu-cp-similar-sch-logo" class="entity-link"><img class=" img-defer-hidden" alt="Colorado State University" width="60" height="60" src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/090/1ad/0f0ca49.png" data-li-src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/005/090/1ad/0f0ca49.png"></a><div class="details"><h4 class="title"><a href="http://www.linkedin.com/edu/school?id=17995&amp;trk=edu-cp-similar-sch-link" title="Colorado State University">Colorado State University</a></h4><span class="subtitle" title="Fort Collins, Colorado Area">Fort Collins, Colorado Area</span></div></li><li><a href="http://www.linkedin.com/edu/school?id=19662&amp;trk=edu-cp-similar-sch-logo" class="entity-link"><img class=" img-defer-hidden" alt="Washington State University" width="60" height="60" src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/5/005/09a/3dc/1de2a1f.png" data-li-src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/5/005/09a/3dc/1de2a1f.png"></a><div class="details"><h4 class="title"><a href="http://www.linkedin.com/edu/school?id=19662&amp;trk=edu-cp-similar-sch-link" title="Washington State University">Washington State University</a></h4><span class="subtitle" title="Spokane, Washington Area">Spokane, Washington Area</span></div></li><li><a href="http://www.linkedin.com/edu/school?id=18238&amp;trk=edu-cp-similar-sch-logo" class="entity-link"><img class=" img-defer-hidden" alt="University of Idaho" width="60" height="60" src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/2/000/25f/399/3026d95.png" data-li-src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/2/000/25f/399/3026d95.png"></a><div class="details"><h4 class="title"><a href="http://www.linkedin.com/edu/school?id=18238&amp;trk=edu-cp-similar-sch-link" title="University of Idaho">University of Idaho</a></h4><span class="subtitle" title="United States">United States</span></div></li><li><a href="http://www.linkedin.com/edu/school?id=19199&amp;trk=edu-cp-similar-sch-logo" class="entity-link"><img class=" img-defer-hidden" alt="Oregon State University" width="60" height="60" src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/8/000/2b1/186/1d33097.png" data-li-src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/8/000/2b1/186/1d33097.png"></a><div class="details"><h4 class="title"><a href="http://www.linkedin.com/edu/school?id=19199&amp;trk=edu-cp-similar-sch-link" title="Oregon State University">Oregon State University</a></h4><span class="subtitle" title="Corvallis, Oregon Area">Corvallis, Oregon Area</span></div></li></ul>'
var $ = cheerio.load(similarSchoolBlock);

$('li').each(function() { 
	var schoolName = $(this).find('h4').text();
	var schoolLocation = $(this).find('span').text();
	console.log(schoolName);
	console.log(schoolLocation);
	var montana = {
		name: schoolName,
		location: schoolLocation
	}
	tempArray.push(montana)
});

var schoolObject = { "similarSchool" : tempArray }

var path = 'similar_schooools.json';
fs.writeFile( path, JSON.stringify(schoolObject, undefined, 2), function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});


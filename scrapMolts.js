var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
////div[@class]/h5/../../span
//for nodejs
var articles='#ieeecs-search-result-response div div div span';//no funciona
var articles='span.media-heading.h4';//no funciona
var term="array";
var term2="swot";
var terms=["array","swot"];
//saveHtmlTerm(term);
searchTerms(terms,true);
function searchTerms(terms,see,agent){
	if( typeof see === 'undefined' || see === null ){
    see=false;
	}
	if( typeof agent === 'undefined' || agent === null ){
    agent="Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36";
	}
	
terms.map(saveHtmlTerm);
	function saveHtmlTerm(term){
		var nightmare = Nightmare({ show: see });
		nightmare
		.useragent(agent)
	  .goto('https://www.computer.org/web/search')
	  .click('#btn50')
	  .wait(1000)
	  .insert('#cs-search-field', term)
	  .click('#btn-cs-search')
	  .wait(1000)
	  .screenshot(term+'.png')
	  .html(term+'.html','HTMLComplete')
	  .run(function (err, nightmare) {
		  if (err) return console.log("ERROR: "+err);
		  console.log('Done '+term);
		})
	  .end();
	}
}


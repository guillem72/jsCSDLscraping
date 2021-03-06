/**
 * Search in terms in www.computer.org and save an image and the html. 
 * */

/**
 * The framework used to scrapt www.computer.org.
 * */
var Nightmare = require('nightmare');

/**
 * The list of terms to search. Every line is a term.
 * */
var terms=readArray("termsECFcompetences.txt");



searchTerms(terms,false);

/**
 * Reads a file and build an array of terms from each line.
 * @param filename The file where the terms are saved. Each line is a term.
 * @return An array of the terms from the file.
 * */
function readArray(filename){
	var fs = require('fs');
var array = fs.readFileSync(filename).toString().split("\n");
 return array;
	}

/**
 * Search the terms a save a capture (in img directory) and the html (in html directory)
 * @param terms An array of the terms to be search.
 * @param see Optional boolean to indicate if Nightmare has to show the process. Default is false. 
 * @param agent The user agent field to send in the http hearder. Default is mozilla firefox.
 * @param sleep Milliseconds between actions made in the webpage. (Default is 1000). A major value is slowly but more probable to retrieve the webpage.
 * */
function searchTerms(terms,see,agent , sleep){
	if( typeof see === 'undefined' || see === null ){
    see=false;
	}
	if( typeof agent === 'undefined' || agent === null ){
    agent="Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36";
	}
	if( typeof sleep === 'undefined' || sleep === null ){
    sleep=1000;
	}
	
terms.map(saveHtmlTerm);

/**
 * Search a term in www.computer.org
 * @param The term to be search.
 * */
	function saveHtmlTerm(term){
		if (term!=''){
			var nightmare = Nightmare({ show: see });
			nightmare
			.useragent(agent)
		  .goto('https://www.computer.org/web/search')
		  .click('#btn50')
		  .wait(sleep)
		  .insert('#cs-search-field', term)
		  .click('#btn-cs-search')
		  .wait(sleep)
		  .screenshot("./img/"+term+'.png')
		  .html("./html/"+term+'.html','HTMLComplete')
		  .run(function (err, nightmare) {
			  if (err) return console.error("ERROR in term "+term+": "+err);
			  console.log('Done '+term);
			})
		  .end();
		}
	}
}


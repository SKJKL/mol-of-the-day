var scrap = require("./scraper.js");
let ps = "div.moleculeAnswer";


const selectRandMol = async () => {
	let fullArr = await scrap.makeMolArray();
	let index = Math.floor(Math.random() * fullArr.length);
	
	let molArr = fullArr[index];

	let details = [molArr[0], molArr[1]];
	
	return details;
}


const getPageForMol = async (css) => {
	let molArray = await selectRandMol();
	let link = molArray[1];
	let fullLink = "https://acs.org"+link;
	let text = await scrap.scrapePage(fullLink,css);
	console.log(fullLink);
	console.log(text);
	return text;
}

getPageForMol(ps);
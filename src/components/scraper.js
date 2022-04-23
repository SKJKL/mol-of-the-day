/*
Currently only makes array of first 5 mols
*/

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

//Test case: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive/a/azulene.html"

//List of molecules: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive.html?archive=All#"
// section ul li, a[href*='molecule']
//$(".moleculeAnswer")...find("p")

let url = "http://127.0.0.1:5500/mol-of-the-day/src/components/web-scraped.html?archive=All";
let look = "div#bd script";
//let query = "https://commonchemistry.cas.org/results?q="
//let look2 = "app-result";

var scrapePage = async (address, css) => {
	try {
		let soup = await axios.get(address);
		let html = soup.data;
		// fs.writeFile("web-scraped.html", html, () => {console.log("Written!")});
		let $ = cheerio.load(html);
		let code = "";
		$(css).map((index, element) => {
			code = $(element).html().trim();
		});
		
		return code;

	} catch (error) {
		console.error(error);
		console.log("Awww");
	}
}


const getMols = async (address,css) => {
	let trimmed = /\[.+\]/.exec(await scrapePage(address,css));
	//fs.writeFile("trimmed.json", trimmed[0], () => {});
	let allMols = JSON.parse(trimmed[0]);
	
	return allMols;
}


/*
const getData = async mol => {
	try {
		let soup = await axios.get(query+mol);
		let html = soup.data;

		fs.writeFile("cas-scrape.html",html,()=>{});
		let $ = cheerio.load(html);
		let number = "";
		// $(look2).map((index, element) => {
		// 	number = $(element).html().trim();
		// });

		$("g").map((index, element) => {
			number = $(element).html().trim();
		});

		console.log(number);

	} catch (error) {
		console.error(error);
		console.log("Awww");
	}
}
*/

const makeMolArray = async () => {
	let molArray = [];
	let molObjs = await getMols(url,look);
	//console.log(molObjs);
	
	for (let i = 0; i < 5; i++) {
		let molobj = molObjs[i];
		molArray.push([molobj.title,molobj.url]);
	}
	return molArray;

}

//getData("cuprous chloride");

module.exports.makeMolArray = makeMolArray;
module.exports.scrapePage = scrapePage;

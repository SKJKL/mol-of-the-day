const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

//Test case: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive/a/azulene.html"

//List of molecules: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive.html?archive=All#"
// section ul li, a[href*='molecule']
//$(".moleculeAnswer")...find("p")

let url = "http://127.0.0.1:5500/mol-of-the-day/src/components/web-scraped.html?archive=All";
let look = "div#bd script";

var getMols = async () => {
	try {
		let soup = await axios.get(url);
		console.log("Start");
		let html = soup.data;
		// fs.writeFile("web-scraped.html", html, () => {console.log("Written!")});
		let $ = cheerio.load(html);
		let code = "";
		$(look).map((index, element) => {
			code = $(element).html().trim();
		});
		let trimmed = /\[.+\]/.exec(code);
		//console.log(trimmed);
		//fs.writeFile("trimmed.json", trimmed[0], () => {});
		let mols = JSON.parse(trimmed[0]);
		console.log("Whoop!");
		
		return mols;

	} catch (error) {
		console.error(error);
		console.log("Awww");
	}
}

let molArray = [];

const makeMolArray = async () => {
	let molObjs = await getMols();
	//console.log(molObjs);
	
	for (let i = 0; i < 5; i++) {
		let molobj = molObjs[i];
		molArray.push(molobj.title);
	}
	console.log(molArray);

}

makeMolArray();

//let trimmed = /(?<=\[){*}/.test(getMols());
//console.log(trimmed);
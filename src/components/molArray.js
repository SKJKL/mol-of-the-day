import scrapePage from "./scraper.js";
import pickCSS from "./pickCSS.js";
// import * as fs from "fs";

const url = "/content/acs/en/molecule-of-the-week/archive.html?archive=All#";
const look = "div#bd script";

const getMols = async (address,css) => {
	let full = await scrapePage(address);
	let trimmed = /\[.+\]/.exec(pickCSS(full, css));
	//fs.writeFile("trimmed.json", trimmed[0], () => {})
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
	// let file = fs.readFileSync('./molList.json');
	let molObjs = await getMols(url,look);
	for (let i = 0; i < molObjs.length; i++) {
		let molobj = molObjs[i];
		molArray.push(molobj.url);//
	}
	return molArray;

}

//getData("cuprous chloride");
export default makeMolArray;
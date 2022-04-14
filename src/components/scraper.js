const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

//Test case: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive/a/azulene.html"

//List of molecules: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive.html?archive=All#"
// section ul li, a[href*='molecule']
//$(".moleculeAnswer")...find("p")

let url = "http://127.0.0.1:5500/mol-of-the-day/src/components/web-scraped.html?archive=All";
let look = "div#bd script";

//use async await
const getMols = async () => {
	try {
		let soup = await axios.get(url);
		console.log("Start");
		let html = soup.data;
		// fs.writeFile("web-scraped.html", html, () => {console.log("Written!")});
		let $ = cheerio.load(html);
		$(look).map((index, element) => {
			console.log($(element).html().trim());
		});
		console.log("Whoop!");

	} catch (error) {
		console.error(error);
		console.log("Awww");
	}
}
getMols();
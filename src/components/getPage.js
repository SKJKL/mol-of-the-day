import scrapePage from "./scraper.js";
import pickCSS from "./pickCSS.js";

const ps = "div.moleculeAnswer";
const head = "h1";

const getPage = async (link) => {
	let html = await scrapePage(link);
	
	let title = pickCSS(html,head);
	let text = pickCSS(html,ps);
	console.log("getPage",title,text);

	return [title,text];
}


// const a = async () => {
// 	let b = await getPage("https://www.acs.org/content/acs/en/molecule-of-the-week/archive/a/azulene.html");
// 	console.log(b);
// }

// a();

export default getPage;
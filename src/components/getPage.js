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




export default getPage;
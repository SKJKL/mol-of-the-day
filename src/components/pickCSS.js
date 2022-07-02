import cheerio from "cheerio";

const pickCSS = (html, css) => {
	let $ =  cheerio.load(html);
	let text = "";
	$(css).map((index, element) => {
		text = $(element).html().trim();
		return true;
		// For "expected return" warning
	});
	
	return text;
}

export default pickCSS;
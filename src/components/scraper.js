import axios from "axios";

//Test case: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive/a/azulene.html"
//List of molecules: "https://www.acs.org/content/acs/en/molecule-of-the-week/archive.html?archive=All#"

const scrapePage = async (address) => {
	try {
		let soup = await axios.get(address);
		let html = soup.data;
		return html;

	} catch (error) {
		console.error(error);
		console.log("Didn't scrape", address);
	}
}

export default scrapePage;

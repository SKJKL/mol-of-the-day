import getPage from "./getPage.js";
import getLink from "./getLink.js";
// import scrapePage from "./scraper.js"
import {useEffect,useState} from "react";

//  "proxy": "https://www.acs.org",

const Body = () => {
	const [text, setText] = useState([]);
	
	useEffect(() => {
		const getData = async () => {
			const link = await getLink();
			const data = await getPage(link);
			setText(data);
		}
		getData();
	}, []);
	
	return (
		<div>
			<h1>{text[0]}</h1>
			<div dangerouslySetInnerHTML={{__html: text[1]}}></div>
		</div>
	)
}

export default Body;

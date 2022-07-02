import getPage from "./getPage.js";
import getLink from "./getLink.js";
import getImage from "./getImage.js";
// import scrapePage from "./scraper.js"
import React, {useEffect,useState} from "react";

//  "proxy": "https://www.acs.org";

const App = () => {
	const [text, setText] = useState([]);
	const [image, setImage] = useState([]);
	
	useEffect(() => {
		const getData = async () => {
			// Will have to do something about names with <i> tags
			const link = await getLink();
			const data = await getPage(link);
			const img = await getImage(data[0]) || "";

			setText(data);
			setImage("data:image/png;base64,"+img);
		}
		getData();
	}, []);
	
	return (
		<div id="grid-div">
			<div id="grid-head" className="textbox">
				<h1>{text[0]}</h1>
			</div>
			<div id="grid-text" className="textbox" dangerouslySetInnerHTML={{__html: text[1]}}></div>
			<div id="grid-image">
				<img id="structure" src={image} alt="Molecule" />
			</div>
		</div>

		
	)
}

export default App;

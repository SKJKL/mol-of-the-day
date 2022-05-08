import makeMolArray from "./molArray.js";

const getLink = async () => {
	let full = await makeMolArray();
	let index = Math.floor(Math.random() * full.length);
	let chosen = full[index];
	let link = chosen;//"https://acs.org"+chosen;
	return link;

}

export default getLink;
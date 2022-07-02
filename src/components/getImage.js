import axios from 'axios';

let key = "CBTZVNVVQrgIiF8MQfiK1hIZGTmni8qe";

const makeReq = async (molecule) => {
	let url = "https://api.rsc.org/compounds/v1/filter/name";
	let body = {name: molecule};
	let header = {
		headers: {apikey: key}
	};

	let postDeets = await axios.post(url, body, header);

	//console.log(postDeets.data.queryId);
	return postDeets.data.queryId;
}


const getID = async (queryID) => {
	let url = `https://api.rsc.org/compounds/v1/filter/${queryID}/results`;
	let config = {
		params: {count: 1},
		headers: {apikey: key}
	};

	let getDeets = await axios.get(url, config);

	//console.log(getDeets.data.results[0]);
	return getDeets.data.results[0];

}


const getImage = async (molecule) => {
	let queryID = await makeReq(molecule);
	let recordID = await getID(queryID);

	let url = `https://api.rsc.org/compounds/v1/records/${recordID}/image`;
	let config = {
		headers: {apikey: key}
	};

	let imageDeets = await axios.get(url, config);

	//console.log(imageDeets.data.image);
	return imageDeets.data.image;
}


export default getImage;
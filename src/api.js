import axios from "axios";
import noImage from "./No_image_poster.png";
const imageAPI = `https://image.tmdb.org/t/p`;

export const getTitles = async (apiUrl) => {
	// console.log(apiUrl);
	try {
		const { data: { total_pages, total_results, results } } = await axios.get(apiUrl);
		return { total_pages, total_results, results };
	} catch (err) {
		return err;
	}
};

export const getTitleInfo = async (apiUrl) => {
	// console.log(apiUrl);
	try {
		const { data } = await axios.get(apiUrl);
		return data;
	} catch (err) {
		return err;
	}
};

export const getImage = (image_path, image_size) => {
	if (image_path !== null) {
		return `${imageAPI}/${image_size}/${image_path}`;
	}
	return noImage;
};

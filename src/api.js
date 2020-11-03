import axios from "axios";
import noPoster from "./No_image_poster.png";
import noBackdrop from "./Night_wallpaper.png";
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

export const getNetworkInfo = async (apiUrl) => {
	try {
		const { data } = await axios.get(apiUrl);
		return data;
	} catch (err) {
		return err;
	}
};

export const getPoster = (image_path, image_size) => {
	if (image_path !== null) {
		return `${imageAPI}/${image_size}${image_path}`;
	}
	return noPoster;
};

export const getBackdrop = (image_path, image_size) => {
	if (image_path !== null) {
		return `${imageAPI}/${image_size}${image_path}`;
	}
	return noBackdrop;
};

export const getNetwork = (image_path, image_size) => {
	if (image_path !== null) {
		return `${imageAPI}/${image_size}${image_path}`;
	}
	return "";
};

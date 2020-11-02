import axios from 'axios';
import noImage from './No_image_poster.png';

const imageWidth = "w500";
const imageAPI = `https://image.tmdb.org/t/p/${imageWidth}`;

/*
export const getImageConfig = async (apiUrl) => {
    console.log(apiUrl);
    try {
        const { data: { images } } = await axios.get(apiUrl);
        return images;
    }
    catch (err) {
        return err;
    }
}
*/

export const getTitles = async (apiUrl) => {
	console.log(apiUrl);
	try {
		const { data: { total_pages, results } } = await axios.get(apiUrl);
		return { total_pages, results };
	} catch (err) {
		return err;
	}
};

export const getTitleInfo = async (apiUrl) => {
    console.log(apiUrl);
    try {
        const { data }  = await axios.get(apiUrl);
        return data;
    } catch (err) {
        return err;
    }
}

export const getImage = (poster_path) => {
	if (poster_path !== null) {
		return imageAPI + poster_path;
	}
	return noImage;
};

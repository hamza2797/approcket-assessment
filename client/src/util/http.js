import axios from 'axios';


/**
 * @type {Axios}
 * @type {AxiosInstance}
 */
const instance = axios.create({
	baseURL: 'localhost:4000/',
});

export default instance;
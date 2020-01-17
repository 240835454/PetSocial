import axios from '@/js_sdk/gangdiedao-uni-axios'

axios.interceptors.request.use(config => { 
	let token = uni.getStorageSync('token'); 
	if (token) {
		config.headers.Authorization = token;
	}
	return config;		
}, err => {
	return Promise.reject(err);
})

export default axios

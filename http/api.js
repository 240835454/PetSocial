import axios from './interceptor.js'
// import qs from 'qs'; 

// let ApiUrl= process.env.NODE_ENV === 'development' ? 'http://192.168.1.136:8100' : 'http://203.88.193.234:8992';
// let ApiUrl = 'http://192.168.1.110:3000/API'; 
let ApiUrl = 'http://192.168.1.106:3000/API'; 

export default {
	get(url, params) { 
		return new Promise((resolve, reject) => {
			axios.get(ApiUrl + url, {
				params: params,
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err); 
			})
		})
	},
	post(url, params) {
		// if(config){
		// 	let config = config;
		// }else{
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
		// }
		return new Promise((resolve, reject) => {
			axios.post(ApiUrl + url, params, config).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			})
		})
	},
	put(url, data) {
		let config = {
			headers: {
				// 'Content-Type': 'application/x-www-form-urlencoded'
				'Content-Type': 'application/json'
			}
		}
		return new Promise((resolve, reject) => {
			axios.put(ApiUrl + url, data, config).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	delete(url, data = {}) {
		let config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		return new Promise((resolve, reject) => {
			axios.delete(ApiUrl + url, {
				params: data
			}, config).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},


	// 上传文件
	uploadFile(file) {
		// let url = 'http://192.168.30.1:3000/image';
		let url = 'http://192.168.1.110:3000/image';
		return new Promise((resolve,reject) => { 
			uni.uploadFile({
				url: url,
				filePath: file,
				name: 'file',
				header:{
					"Content-Type": "multipart/form-data",
				},
				success: res => {
					console.log(res);
					resolve(JSON.parse(res.data));
				},
				fail: err=>{
					reject(err);
				}
			})
		})
	}
}

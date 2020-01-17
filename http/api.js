import axios from './interceptor.js'
// import qs from 'qs'; 

// let ApiUrl= process.env.NODE_ENV === 'development' ? 'http://192.168.1.136:8100' : 'http://203.88.193.234:8992';
let ApiUrl = 'http://192.168.1.101:3000/api'; 

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
	post(url, params,config) {
		if(config){
			let config = config;
		}else{
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
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
		let url = 'http://14.18.81.113:8300/api/file/Files/single';
		return new Promise((resolve,reject) => {
			uni.uploadFile({
				url: url,
				filePath: file,
				name: 'file',
				success: res => {
					resolve(JSON.parse(res.data));
				},
				fail: err=>{
					reject(err);
				}
			})
		})
	}
}

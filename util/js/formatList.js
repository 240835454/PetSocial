function formatList(arr, keyword) {
		let newArr1 = [];
		let tempArr = [];
		let reg = /\b(\w)|\s(\w)/g;
		let k = 0;
		let firstWord = arr[0][keyword].charAt(0).toUpperCase(); //获取第一个分类字母
		arr.map((v) => {
			v[keyword] = v[keyword].replace(reg, m => m.toUpperCase()); //首字母大写
			if (firstWord == v[keyword].charAt(0)) {
				tempArr.push(v);
				newArr1[k] = {
					Title: firstWord,
					List: tempArr
				}
			} else {
				//这里循环到这表示已经第二个字母了
				firstWord = v[keyword].charAt(0); //设置第二字母
				tempArr = []; //把之前的清除掉
				tempArr.push(v); //添加第一个
				newArr1[++k] = { //自增
					Title: firstWord,
					List: tempArr
				}
			}
		});
		return newArr1;
	}
	
	export {
		formatList
	}

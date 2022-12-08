const screen = uni.getSystemInfoSync().windowWidth / 750;
// 缓存图片
let cache = {}
export function isNumber(value) {
	return /^-?\d+(\.\d+)?$/.test(value);
}
export function toPx(value, baseSize) {
	// 如果是数字
	if (typeof value === 'number') {
		return value
	}
	// 如果是字符串数字
	if (isNumber(value)) {
		return value * 1
	}
	// 如果有单位
	if (typeof value === 'string') {
		const reg = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g
		const results = reg.exec(value);
		if (!value || !results) {
			return 0;
		}
		const unit = results[3];
		value = parseFloat(value);
		let res = 0;
		if (unit === 'rpx') {
			res = Math.floor(value * (screen || 0.5) * 1);
		} else if (unit === 'px') {
			res = Math.floor(value * 1);
		} else if (unit === '%') {
			res = Math.floor(value * toPx(baseSize) / 100);
		} else if (unit === 'em') {
			res = Math.ceil(value * toPx(baseSize || 14));
		}
		return res;
	}
}

// 计算版本
export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

/** 从 0x20 开始到 0x80 的字符宽度数据 */
export const CHAR_WIDTH_SCALE_MAP = [0.296, 0.313, 0.436, 0.638, 0.586, 0.89, 0.87, 0.256, 0.334, 0.334, 0.455, 0.742,
	0.241, 0.433, 0.241, 0.427, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.241, 0.241, 0.742,
	0.742, 0.742, 0.483, 1.031, 0.704, 0.627, 0.669, 0.762, 0.55, 0.531, 0.744, 0.773, 0.294, 0.396, 0.635, 0.513, 0.977,
	0.813, 0.815, 0.612, 0.815, 0.653, 0.577, 0.573, 0.747, 0.676, 1.018, 0.645, 0.604, 0.62, 0.334, 0.416, 0.334, 0.742,
	0.448, 0.295, 0.553, 0.639, 0.501, 0.64, 0.567, 0.347, 0.64, 0.616, 0.266, 0.267, 0.544, 0.266, 0.937, 0.616, 0.636,
	0.639, 0.64, 0.382, 0.463, 0.373, 0.616, 0.525, 0.79, 0.507, 0.529, 0.492, 0.334, 0.269, 0.334, 0.742, 0.296
];
// #ifdef MP
const prefix = () => {
	// #ifdef MP-TOUTIAO
	return tt
	// #endif
	// #ifdef MP-WEIXIN
	return wx
	// #endif
	// #ifdef MP-BAIDU
	return swan
	// #endif
	// #ifdef MP-ALIPAY
	return my
	// #endif
	// #ifdef MP-QQ
	return qq
	// #endif
	// #ifdef MP-360
	return qh
	// #endif
}

const base64ToArrayBuffer = (data) => {
	/**
	 * base64ToArrayBuffer
	 * Base64Binary.decode(base64_string);  
	 * Base64Binary.decodeArrayBuffer(base64_string); 
	 */
	const Base64Binary = {
	  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	  
	  /* will return a  Uint8Array type */
	  decodeArrayBuffer(input) {
	    const bytes = (input.length/4) * 3;
	    const ab = new ArrayBuffer(bytes);
	    this.decode(input, ab);
	    return ab;
	  },
	 
	  removePaddingChars(input) {
	    const lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
	    if(lkey == 64){
	      return input.substring(0,input.length - 1);
	    }
	    return input;
	  },
	 
	  decode(input, arrayBuffer) {
	    //get last chars to see if are valid
	    input = this.removePaddingChars(input);
	    input = this.removePaddingChars(input);
	 
	    const bytes = parseInt((input.length / 4) * 3, 10);
	    
	    let uarray;
	    let chr1, chr2, chr3;
	    let enc1, enc2, enc3, enc4;
	    let i = 0;
	    let j = 0;
	    
	    if (arrayBuffer)
	      uarray = new Uint8Array(arrayBuffer);
	    else
	      uarray = new Uint8Array(bytes);
	    
	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	    
	    for (i=0; i<bytes; i+=3) {  
	      //get the 3 octects in 4 ascii chars
	      enc1 = this._keyStr.indexOf(input.charAt(j++));
	      enc2 = this._keyStr.indexOf(input.charAt(j++));
	      enc3 = this._keyStr.indexOf(input.charAt(j++));
	      enc4 = this._keyStr.indexOf(input.charAt(j++));
	  
	      chr1 = (enc1 << 2) | (enc2 >> 4);
	      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	      chr3 = ((enc3 & 3) << 6) | enc4;
	  
	      uarray[i] = chr1;      
	      if (enc3 != 64) uarray[i+1] = chr2;
	      if (enc4 != 64) uarray[i+2] = chr3;
	    }
	    return uarray;  
	  }
	 }
	return (uni.base64ToArrayBuffer && uni.base64ToArrayBuffer(data)) || Base64Binary.decodeArrayBuffer(data)
}
// #endif

/**
 * base64转路径
 * @param {Object} base64
 */
export function base64ToPath(base64) {
	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
	
	return new Promise((resolve, reject) => {
		// #ifdef MP
		const fs = uni.getFileSystemManager()
		
		//自定义文件名
		if (!format) {
			console.error('ERROR_BASE64SRC_PARSE')
			reject(new Error('ERROR_BASE64SRC_PARSE'))
		}
		const time = new Date().getTime();
		let pre = prefix()
		const filePath = `${pre.env.USER_DATA_PATH}/${time}.${format}`
		let buffer = base64ToArrayBuffer(bodyData)
		fs.writeFile({
			filePath,
			data: buffer,
			encoding: 'binary',
			success() {
				resolve(filePath)
			},
			fail(err) {
				console.error('获取base64图片失败', JSON.stringify(err))
				reject(err)
			}
		})
		// #endif
		
		// #ifdef H5
		// mime类型
		let mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; 
		//base64 解码
		let byteString = atob(base64.split(',')[1]); 
		//创建缓冲数组
		let arrayBuffer = new ArrayBuffer(byteString.length);
		//创建视图
		let intArray = new Uint8Array(arrayBuffer); 
		for (let i = 0; i < byteString.length; i++) {
			intArray[i] = byteString.charCodeAt(i);
		}
		resolve(URL.createObjectURL(new Blob([intArray], { type: mimeString })))
		// #endif
		
		// #ifdef APP-PLUS
		const bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
		bitmap.loadBase64Data(base64, () => {
			if (!format) {
				console.error('ERROR_BASE64SRC_PARSE')
				reject(new Error('ERROR_BASE64SRC_PARSE'))
			}
			const time = new Date().getTime();
			const filePath = `_doc/uniapp_temp/${time}.${format}`
			
			bitmap.save(filePath, {}, 
				() => {
					bitmap.clear()
					resolve(filePath)
				}, 
				(error) => {
					bitmap.clear()
					console.error(`${JSON.stringify(error)}`)
					reject(error)
				})
		}, (error) => {
			bitmap.clear()
			console.error(`${JSON.stringify(error)}`)
			reject(error)
		})
		// #endif
	})
}

/**
 * 路径转base64
 * @param {Object} string
 */

export function pathToBase64(path) {
	return new Promise((resolve, reject) => {
		// #ifdef H5
		const _canvas = ()=> {
			let image = new Image();
			image.onload = function() {
				let canvas = document.createElement('canvas');
				// 获取图片原始宽高
				canvas.width = this.naturalWidth;
				canvas.height = this.naturalHeight;
				// 将图片插入画布并开始绘制
				canvas.getContext('2d').drawImage(image, 0, 0);
				let result = canvas.toDataURL('image/png')
				resolve(result);
				canvas.height = canvas.width = 0
			}
			image.src = path
			image.setAttribute("crossOrigin",'Anonymous');
			image.src = path;
			image.onerror = (error) => {
				console.error(`urlToBase64 error: ${path}`, JSON.stringify(error))
			    reject(new Error('urlToBase64 error'));
			};
		}
		const _fileReader = (blob) => {
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
			    resolve(e.target.result);
			};
			fileReader.readAsDataURL(blob);
			fileReader.onerror = (error) => {
				console.error('blobToBase64 error:', JSON.stringify(error))
			    reject(new Error('blobToBase64 error'));
			};
		}
		const isFileReader = typeof FileReader === 'function'
		if(/^(http|\/\/)/.test(path) && isFileReader ) {
			window.URL = window.URL || window.webkitURL;
			const xhr = new XMLHttpRequest();
			xhr.open("get", path, true);
			xhr.timeout = 2000;
			xhr.responseType = "blob";
			xhr.onload = function() {
				if(this.status == 200) {
					_fileReader(this.response)
				} else {
					_canvas()
				}
			}
			xhr.onreadystatechange = function() {
				if(this.status === 0) {
					console.error('图片跨域了，得后端处理咯')
				}
			}
			xhr.send();
		} else if(/^blob/.test(path) && isFileReader){
			_fileReader(path)
		} else {
			_canvas()
		}
		// #endif
		
		// #ifdef MP
		if(uni.canIUse('getFileSystemManager')) {
			uni.getFileSystemManager().readFile({
			    filePath: path,
			    encoding: 'base64',
			    success: (res) => {
			        resolve('data:image/png;base64,' + res.data)
			    },
			    fail: (error) => {
					console.error('urlToBase64 error:', JSON.stringify(error))
			        reject(error)
			    }
			})
		}
		// #endif
		
		// #ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), (entry) => {
		    entry.file((file) => {
		        const fileReader = new plus.io.FileReader()
		        fileReader.onload = (data) => {
		            resolve(data.target.result)
		        }
		        fileReader.onerror = (error) => {
					console.error('pathToBase64 error:', JSON.stringify(error))
		            reject(error)
		        }
		        fileReader.readAsDataURL(file)
		    }, (error) => {
				console.error('pathToBase64 error:', JSON.stringify(error))
		        reject(error)
		    })
		}, (error) => {
			console.error('pathToBase64 error:', JSON.stringify(error))
		    reject(error)
		})
		// #endif
	})
}

// #ifdef APP-PLUS
const getLocalFilePath = (path)=> {
    if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
        return path
    }
    if (path.indexOf('file://') === 0) {
        return path
    }
    if (path.indexOf('/storage/emulated/0/') === 0) {
        return path
    }
    if (path.indexOf('/') === 0) {
        const localFilePath = plus.io.convertAbsoluteFileSystem(path)
        if (localFilePath !== path) {
            return localFilePath
        } else {
            path = path.substr(1)
        }
    }
    return '_www/' + path
}
// #endif

export function getImageInfo(img, isH5PathToBase64) {
	return new Promise(async (resolve, reject) => {
		const base64Reg = /^data:image\/(\w+);base64/
		const localReg = /^\.|^\/(?=[^\/])/;
		const networkReg = /^(http|\/\/)/
		// #ifdef H5
		if(networkReg.test(img) && isH5PathToBase64) {
			img = await pathToBase64(img)
		}
		// #endif
		// #ifndef MP-ALIPAY 
		if(base64Reg.test(img)) {
			if(!cache[img]) {
				const imgName = img
				img = await base64ToPath(img)
				cache[imgName] = img
			} else {
				img = cache[img]
			}
		}
		// #endif
		if(cache[img] && cache[img].errMsg) {
			resolve(cache[img])
		} else {
			uni.getImageInfo({
				src: img,
				success: (image) => {
					// #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ || MP-TOUTIAO
					image.path = localReg.test(img) ?  `/${image.path}` : image.path;
					// #endif
					// image.path = /^(http|\/\/|\/|wxfile|data:image\/(\w+);base64|file|bdfile|ttfile|blob)/.test(image.path) ? image.path : `/${image.path}`;
					image.url = img
					cache[img] = image
					resolve(cache[img])
				},
				fail(err) {
					resolve({path: img})
					console.error(`getImageInfo:fail ${img} failed ${JSON.stringify(err)}`);
				}
			})
		}
	})
}
	
	
	
export class DataUtil {
  /**
   * 设置差异数据
   * @param component
   * @param data
   */
  setDiffData(component, data) {
	const diffData = {};

	// 遍历获取到有差异的数据
	Object.keys(data).forEach(key => {
	  if (component[key] !== data[key]) {
		diffData[key] = data[key];
	  }
	});

	// 设置数据
	if (Object.keys(diffData).length) {
	  // component.setData(diffData);
	}
  }
}
// const dataUtil = new DataUtil;
// export dataUtil;
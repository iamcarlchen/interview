let ERROR_INPUT_TYYPE = 1; //数据类型错误
let ERROR_IP_PART_NOT_4 = 2; //IP段不是4个
let ERROR_IP_NOT_LEGAL_STR = 3; //存在不合法字符
let ERROR_IP_TOO_BIG = 4; //IP数值太大
let ERROR_CONTINUE_DOT = 5; //连续两个点
let ERROR_SPACE_NOT_RIGHT = 6; //空格位子不对

function transfer(input){
	if(typeof input != "string"){
		return {
			errorCode:ERROR_INPUT_TYYPE
		};
	}

	let numArr = [];
	let len = input.length;
	let number = 0;
	let pow = 2;
	for(let i = 0;i<len ;i++){
		let char = input.charAt(i);
		switch(char){
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				if(pow<0){
					return {
						errorCode:ERROR_IP_TOO_BIG
					}
				}
				number += parseInt(char)*Math.pow(10,pow);
				pow--;
				//最后一位
				if(i+1 == len){
					if(pow >=0){
						number = number/Math.pow(10,pow+1);
					}
					if(number>255){
						return {
							errorCode:ERROR_IP_TOO_BIG
						}
					}
					numArr.push(number);
				}
				break;
			case ".":
				if(pow == 2){
					return {
						errorCode:ERROR_CONTINUE_DOT
					}
				}
				if(pow >=0){
					number = number/Math.pow(10,pow+1);
				}
				if(number>255){
					return {
						errorCode:ERROR_IP_TOO_BIG
					}
				}
				
				numArr.push(number);
				number = 0;
				pow = 2;
				break;
			case " ":
				if(pow >-1 && pow < 2){
					return {
						errorCode:ERROR_SPACE_NOT_RIGHT
					}
				}
				break;
			default:
				return {
					errorCode:ERROR_IP_NOT_LEGAL_STR
				}
		}
	}

	// console.log(numArr);
	if(numArr.length != 4){
		return {
			errorCode:ERROR_IP_PART_NOT_4
		};
	}

	let temp2 = [];
	numArr.forEach(function(number){
	    for(i = 7;i>=0;i--){
	        temp2.push(parseInt(number/Math.pow(2,i)));
	        number = number%Math.pow(2,i);
	    }});
	let result = 0;
	temp2.forEach(function(number,i){
	    result += Math.pow(2,(31-i))*number;
	});
	return result;
}

module.exports = transfer;
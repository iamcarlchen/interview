let ERROR_INPUT_TYPE = 1;//数据类型错误
let ERROR_ILLEGAL_CHAR = 2; //输入非法字符
let ERROR_IP_TOO_BIG = 3; //IP段数字超出255
let ERROR_DOT_AT_START = 4; //字符'.'在开头
let ERROR_DOT_AT_END = 5; //字符'.'在结尾
let ERROR_DOT_CONTINUE = 6; //字符'.'连续
let ERROR_DOT_NUMBER = 7; //字符'.'数目不等于3
let ERROR_SPACE_POSITION = 8;//空格处于数字之间

function transfer(input){
	if(typeof input != "string"){
		return {
			errorCode:ERROR_INPUT_TYPE
		};
	}
	let numArr = [];
	let len = input.length;
	let number = 0;
	let power = 2;
	let dotnum = 0;
	for(let i = 0;i<len ;i++){
		let char = input[i];
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

				number += parseInt(char)*Math.pow(10,power);
				if(input[i+1] != '.' && input[i+1] != ' ' && i<len-1){
					power--;
				}
				if(i==len-1 && dotnum==3 ){
					number = parseInt(number/Math.pow(10,power));
					numArr.push(number);
					number = 0;
					power = 2;
				}
				break;
			case ".":
				dotnum++;
				if(i==0)
					return {
						errorCode:ERROR_DOT_AT_START
					}
				if(i==len-1)
					return {
						errorCode:ERROR_DOT_AT_END
					}
				if(dotnum>3)
					return {
						errorCode:ERROR_DOT_NUMBER
					}
				if((i<len && input[i+1]=='.'))
					return{
						errorCode:ERROR_DOT_CONTINUE
					}
				number = parseInt(number/Math.pow(10,power));
				if(number>255){
					return {
						errorCode:ERROR_IP_TOO_BIG
					}
				}
				numArr.push(number);
				number = 0;
				power = 2;
				break;
			case " ":
				if((i-1>0 && (input.charAt(i-1)!= '.' && input.charAt(i-1)!=' ')) 
					&& (i+1<=len && (input.charAt(i+1)!= '.' && input.charAt(i+1)!=' ')))

					return {
						errorCode:ERROR_SPACE_POSITION
					}

				if(power >=0 && dotnum==3){
					if(number){
						number = parseInt(number/Math.pow(10,power));
						numArr.push(number);
						number = 0;
						power = 2;
					}
					break;
				}
				break;
			default:
				return {
					errorCode:ERROR_ILLEGAL_CHAR
				}
		}
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
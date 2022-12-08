export function formatUnit(value, symbol) { //两个参数，一个是值，一个是货币类型（￥,$）
	var obj = {
		symbol: symbol || "", //货币类型
		int: undefined, //整数位
		dec: undefined, //小数位
		targ: "", //正负
		times: ['', 'M', 'B', 'MB', 'BB']
	}
	if(value == 0){
		return parseFloat(value).toFixed(2);
	}
	value = String(value);
	var reg = /^-?\d+\.?\d+$/;
	if (!reg.test(value)) {
		return false;
	}

	if (value[0] == "-") {
		obj.targ = "-";
		value = value.substring(1, value.length)
	}

	var times = 0;
	value = Number(value);
	while (value > 10000) {
		value = value / 10000;
		times++;
	}

	value = value.toFixed(2)

	var arr = String(value).split(".")
	obj.dec = arr[1];
	obj.int = arr[0];
	if (obj.int.length > 3) {
		obj.int = obj.int.replace(/(.{1})/, '$1,')
	}

	return obj.symbol + obj.targ + obj.int + "." + obj.dec + obj.times[times];
}

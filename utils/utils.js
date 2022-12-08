export function fixD(num, precision) {
    // num初始化
    if (num + '' === '0') {
        return '0.'.padEnd(precision + 2, '0');
    }
    if (!num) {
        return '--';
    }
    let newnum = parseFloat(num) + '';
    if (newnum === 'NaN') {
        return '--';
    }
    let fixNum = newnum;
    // 科学计数法计算
    if (newnum.toLowerCase().indexOf('e') > -1) {
        let a = newnum.toLowerCase().split('e');
        let b = a[0];
        let c = Math.abs(parseFloat(a[1]));
        let d = '';
        let h = b.length;
        let i;
        if (a[0].split('.')[1]) {
            b = a[0].split('.')[0] + a[0].split('.')[1];
            h = a[0].split('.')[0].length;
        }
        for (i = 0; i < c - h; i++) {
            d = d + '0';
        }
        fixNum = '0.' + d + b;
    }
    // 精度格式化
    // precision初始化
    if (precision + '' !== '0' && !precision) {
        return fixNum;
    }
    if (parseFloat(num) + '' === 'NaN') {
        return fixNum;
    }
    let fNum = fixNum.split('.');
    if (precision === 0) {
        fixNum = parseInt(fixNum);
    } else if (precision > 0 && fNum[1]) {
        if (fNum[1].length > precision) {
            if (fNum[1].indexOf('999999999') > -1) {
                let s = parseFloat(fixNum).toFixed(precision + 1);
                fixNum = s.slice(0, s.length - 1);
            } else {
                fixNum = fNum[0] + '.' + fNum[1].slice(0, precision);
            }
        } else {
            fixNum = parseFloat(fixNum).toFixed(precision);
        }
    } else {
        fixNum = parseFloat(fixNum).toFixed(precision);
    }
    return fixNum;
}

/**
 * 大数字转换，将大额数字转换为万、千万、亿等
 * @param value 数字值
 */
export function formatD (value) {
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let text1 = ''
  let fm = 1
  while (value / fr >= 1) {
    fr *= 10
    num += 1
    // console.log('数字', value / fr, 'num:', num)
  }
  if (num <= 4) { // 千
    newValue[0] = parseInt(value / 1000) + ''
    newValue[1] = '千'
  } else if (num <= 8) { // 万
    text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  } else if (num <= 16) { // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1
    if (text1 === '亿') {
      fm = 100000000
    } else if (text1 === '千亿') {
      fm = 100000000000
    } else if (text1 === '万亿') {
      fm = 1000000000000
    } else if (text1 === '千万亿') {
      fm = 1000000000000000
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  }
  if (value < 1000) {
    newValue[0] = value + ''
    newValue[1] = ''
  }
  return newValue.join('')
}

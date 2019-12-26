// 防抖
export function debounce(fn, wait = 300) {
  let timeout = null;
  return function() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

// 科学记数法
export function scientificNotation(value) {
  if (typeof value === 'undefined' || value === null || isNaN(value)) {
    return value;
  }
  const stringValue = value.toString();
  const [integer, decimal] = stringValue.split('.');
  if (integer.length <= 3) {
    return stringValue;
  }
  let total = '';
  for (let i = integer.length - 1, j = 1; i > -1; i--, j++) {
    const num = j % 3 === 0 ? `,${integer[i]}` : integer[i];
    total = num + total;
  }
  total = total.replace(/^,/, '') + (decimal ? `.${decimal}` : '');
  return total;
}

// 四舍五入保留预订小数
export function halfAdjust(value, fixedLength = 2) {
  if (!value || !fixedLength) {
    console.log('you should provide a num and fixed length');
    return false;
  }
  const power = Math.pow(10, fixedLength);
  const powNum = value * power;
  const roundNum = Math.round(powNum);
  return roundNum / power;
}

export function format(time, fmt) {
  let data = new Date(time);
  var o = {
    'M+': data.getMonth() + 1, //月份
    'd+': data.getDate(), //日
    'h+': data.getHours(), //小时
    'm+': data.getMinutes(), //分
    's+': data.getSeconds(), //秒
    'q+': Math.floor((data.getMonth() + 3) / 3), //季度
    S: data.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

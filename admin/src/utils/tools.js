import XLSX from 'xlsx';
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

//日期格式化
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

export function exportExcel(headers, data, fileName = '导出文件.xlsx') {
  const _headers = headers
    .map((item, i) =>
      Object.assign(
        {},
        { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }
      )
    )
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }),
      {}
    );

  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign(
          {},
          { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) }
        )
      )
    )
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  // 构建 workbook 对象
  const wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      mySheet: Object.assign({}, output, {
        '!ref': ref,
        '!cols': [
          { wpx: 45 },
          { wpx: 100 },
          { wpx: 200 },
          { wpx: 80 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 300 },
          { wpx: 300 }
        ]
      })
    }
  };

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
}

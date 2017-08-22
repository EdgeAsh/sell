export function formatDate(date,pattern){
  if(/(y+)/.test(pattern)){
    pattern = pattern.replace(RegExp.$1,(date.getFullYear()+'').substring(4-RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth()+1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }

  for(let k in o){
    if(new RegExp(`(${k})`).test(pattern)){
      let str = o[k] + '';
      pattern = pattern.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return pattern;
};

function padLeftZero(str){
  return ('00' + str).substr(str.length);
}
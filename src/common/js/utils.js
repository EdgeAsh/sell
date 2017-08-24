/*
  解析url参数
  @example ?id=12345&a=b
  @return Object{id:12345,a:b}
*/
export function urlParse(){
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g; //对于example，此正则匹配得到两个字符串?id=12345与&a=b两个
  let arr = url.match(reg);
  // ['?id=12345','&a=b']
  if(arr){
    arr.forEach(function(item){
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
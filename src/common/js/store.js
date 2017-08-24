export function saveToLocal(id,key,value){
  // 将seller.vue中的favorite状态存入，以id区别不同商家
  let seller = localStorage.__seller__; //__seller__表示私有属性
  if(!seller){
    // 如果在localStorage中不存在__seller__属性，创建一个seller对象
    // seller存储的是全部商家
    seller = {};
    // seller[id]存储的是一个商家，每一个id对应的是一个商家，是对象
    seller[id] = {};
  }else{
    // 将字符串转成对象
    seller = JSON.parse(seller);
    if(!seller[id]){
      // 如果id是新的，则需要创建一个新的商家对象
      seller[id] = {}
    }
  }
  seller[id][key] = value;

  // localStorage存储的是字符串，不能直接存对象
  localStorage.__seller__ = JSON.stringify(seller); 
}

export function loadFromLocal(id,key,deft){
  let seller = localStorage.__seller__;
  if(!seller){
    return deft;
  }
  seller = JSON.parse(seller);
  if(!seller[id]){
    return deft;
  }else{
    return seller[id][key] || deft;
  }

}

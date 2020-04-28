'Use strict'
//sample variable
var mainVar = {
  a: 14,
  b: 'foo',
  c: [1,2,3],
  d: {
    d: [
      {d:[1,2,3]},
      null,
      undefined,
      [null, undefined]
    ]
  },
  NaN: NaN
}

var mainPrim = 5;

var mainArr = [1,2,3];

var secArr = [['uno',1],['do', 2], 3];

var thirdArr = [
  [],
  [['a', 'b', null],{a:'b'}],
  [{b:'a'},[]],
  []
]



function deepCopy(obj){

  let newObj

  if(Object.prototype.toString.call(obj) === '[object Object]'){
    let kostyil = new Object()
    new Map(deepCopy(Object.entries(obj)))
    .forEach((val, key) => {
      kostyil[key] = val
    })
    newObj = kostyil
  }
  else if(Array.isArray(obj)){
    newObj = obj.map(elem=>{
      return deepCopy(elem)
    })
  }
  else{
    newObj = obj
  }

  return newObj
}


// function deepCopy(deepObj) {
//
//   let copyObj;
//
//   if (Array.isArray(deepObj)) {
//     copyObj = [];
//     for (let i = 0; i < deepObj.length; i++) {
//       copyObj[i] = deepCopy(deepObj[i]);
//     }
//   }
//   else if (Object.prototype.toString.call(deepObj) === '[object Object]') {
//     copyObj = {};
//     for (let key in deepObj) {
//       copyObj[key] = deepCopy(deepObj[key]);
//     }
//   }
//   else {
//     copyObj = deepObj;
//   }
//   return copyObj;
// }

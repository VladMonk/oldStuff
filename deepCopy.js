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
  e: function e(){
    console.log('Hi');
  },
  NaN: NaN
}

var mainPrim = 5;

function mainFunc(){
  console.log('Priv');
}

var mainArr = [1,2,3];

var secArr = [['uno',1],['do', 2]];

var thirdArr = [
  [],
  [['a', 'b', null],{a:'b'}],
  [{b:'a'},[]],
  mainFunc,
  []
]



function deepCopy(obj){

  let newObj = new Object()

  if(Object.prototype.toString.call(obj) === '[object Object]'){
    new Map(Object.entries(obj)).forEach((val, key)=>{
      newObj[key] = val
    });
  }
  else{
    newObj.key = obj
    newObj = deepCopy(newObj).key
  }

  return newObj
}

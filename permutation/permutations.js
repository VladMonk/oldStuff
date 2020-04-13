let input=[];
const сounter = [];

process.argv.slice(2).forEach(function(value,index){
    input[index]=value;
});

input.forEach(function(element,input){
  var sorted = [...element].sort().join("");
  if(сounter[sorted]){
    const{count, input}=сounter[sorted];
    сounter[sorted]={count:count+1,input:[...input,element]};
  }
  else{
    сounter[sorted]={count:1,input:[element]};
  }
});

const sortEntries=Object.entries(сounter).sort((a,b)=>b[1].count-a[1].count);

if(input[0]){
  console.log(sortEntries[0][1].input.join('\n'))
}
else{
  console.log("Empty string detected, u need to enter anagrams with a space");
}

const date= new Date();
console.log(date.getDate());
var day=date.getDate();
const arr=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
console.log(arr[date.getMonth()]);
var month=arr[date.getMonth()];
document.querySelector(".date").innerHTML=month + " "+ day;
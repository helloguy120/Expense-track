import { db, storage } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
ref,
uploadBytes
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";

const PASSWORD = "admin123";

window.login = function(){

if(document.getElementById("passwordInput").value === PASSWORD){
document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";
loadDashboard();
}

}

async function getExchangeRate(){

let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
let data = await res.json();

return data.rates.INR;
}

async function loadDashboard(){

let sales = await getDocs(collection(db,"sales"));
let expenses = await getDocs(collection(db,"expenses"));

let income = 0;
let expense = 0;

let categoryMap = {};

sales.forEach(doc=>{
let d = doc.data();
income += d.revenue;

if(!categoryMap[d.category]) categoryMap[d.category]=0;
categoryMap[d.category]+=d.revenue;
});

expenses.forEach(doc=>{
expense += doc.data().amount;
});

let rate = await getExchangeRate();

document.getElementById("income").innerText =
income + " USD / " + (income*rate).toFixed(2) + " INR";

document.getElementById("expense").innerText =
expense + " USD / " + (expense*rate).toFixed(2) + " INR";

document.getElementById("profit").innerText =
(income-expense).toFixed(2);

createCharts(categoryMap);
}

function createCharts(categoryMap){

new Chart(document.getElementById("categoryChart"),{
type:"bar",
data:{
labels:Object.keys(categoryMap),
datasets:[{
label:"Category Sales",
data:Object.values(categoryMap)
}]
}
});

}

window.backupData = async function(){

let products = await getDocs(collection(db,"products"));
let sales = await getDocs(collection(db,"sales"));
let expenses = await getDocs(collection(db,"expenses"));

let backup = {
products: products.docs.map(d=>d.data()),
sales: sales.docs.map(d=>d.data()),
expenses: expenses.docs.map(d=>d.data())
};

let jsonBlob = new Blob([JSON.stringify(backup)],{type:"application/json"});

let filename = "backup-"+Date.now()+".json";

downloadFile(jsonBlob,filename);

uploadCloud(jsonBlob,filename);

}

function downloadFile(blob,name){

let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = name;
a.click();
}

async function uploadCloud(blob,name){

let storageRef = ref(storage,"backups/"+name);
await uploadBytes(storageRef,blob);

alert("Backup Uploaded To Cloud");
}

window.exportExcel = async function(){

let sales = await getDocs(collection(db,"sales"));

let data = sales.docs.map(d=>d.data());

let ws = XLSX.utils.json_to_sheet(data);
let wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb,ws,"Sales");

XLSX.writeFile(wb,"sales-report.xlsx");

}

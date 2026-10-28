const BASE_URL = "https://api.frankfurter.dev/v1/latest";

const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg  = document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        } 
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const  updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}


btn.addEventListener("click", (evt) => {
evt.preventDefault();
updateExchangeRate();
});

const updateExchangeRate = async ()=>{
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";};

    const from= fromCurr.value;
    const to= toCurr.value;

const url = `${BASE_URL}?base=${from}&symbols=${to}`;
const response = await fetch(url);
const data = await response.json();

const rate = data.rates[toCurr.value.toUpperCase()];

const finalAmount = amtVal * rate;
msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;

window.addEventListener("load", () =>{
 updateExchangeRate();
});
}

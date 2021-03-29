
/* Global Variables */

//post method
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();
    return newData
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const appUrl="http://localhost:3000/";
//API
const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=ff0a18b470a21f9979a6d58f53599255';

//listen to generate button
document.getElementById('generate').addEventListener('click',performAction)

function performAction(e){
  const cityZip=document.getElementById('zip').value;
  const feeling=document.getElementById('feelings').value;
   getWeatherData(baseUrl,cityZip,apiKey).then(function(data){
     console.log(data);
     postData(`${appUrl}sendWeatherData`,{
       date :newDate,
       temp :data.main.temp,
       content :feeling
     })
   }).then(function () {
    updateUI();
  });
};


const getWeatherData= async (baseUrl,cityZip,apiKey)=>{
    const res= await fetch(baseUrl+cityZip+apiKey);

    try{
      const data =await res.json();
      return data;
    }catch(error){
        console.log(`error :${error}`);
    }
}

const getData=async(url='')=>{
  const response=await fetch(url);
  try {
    const retrievedData = await response.json();
    return retrievedData;
  }catch(error) {
  console.log("error", error);
  }
}


const updateUI = async () => {
  const req = await fetch(`${appUrl}all`);
  try {
    const data = await req.json();
    console.log(data)
    document.getElementById('date').innerHTML=data.date;
    document.getElementById('temp').innerHTML=data.temp;
    document.getElementById('content').innerHTML=data.content;
  } catch (err) {
    console.log("error", err);
  }
};
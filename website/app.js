
 const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
 const apikey='&appid=82d3648a9571ac147cc2779456cb65d6&units=metric';
 /*fetch data from the api*/
 //
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  //get the city value from the html page
let Zipcode =  document.getElementById('zip').value;
let feeling =  document.getElementById('feelings').value;
//set the dynamic api and fetch it
getWeather(baseURL,Zipcode,apikey)
.then(function(data){
  postData('/addData',{timezone:data.timezone,temp:data.main.temp,feeling:feeling})
  updateUI()
})
}
// the get http request to fetch data from the dynamic api
const getWeather = async (baseURL,Zipcode, key)=>{

  const res = await fetch(baseURL+Zipcode+key)
  try {

    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

 /* Function to POST data to the server side*/
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  //use the data from alldata object to updat UI
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log("the alldata updat"+allData.feel);
    let date=new Date();
    let newDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    document.getElementById('date').innerHTML =`Date:${newDate}`;
      document.getElementById('temp').innerHTML =`Temperature:${allData.temp}`;
    document.getElementById('content').innerHTML = `I feel:${allData.feel}`;

  }catch(error){
    console.log("error", error);
  }
}
  
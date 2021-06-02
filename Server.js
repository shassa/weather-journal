projectData ={};

const express=require('express');
const app =express();
const body_parser=require('body-parser');
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());
const cors=require('cors');
app.use(express.static('website'));

app.use(cors());

const port=3000;
const server =app.listen(port,listening);
function listening(){
    console.log(`server connected in port :${port}`);
}
//page have all data to fetch from it to UI
app.get('/all', function (request, response) {
  response.send(projectData);
});

// POST data to the main object
 app.post('/addData', addData);
function addData(request, response) {
  let data = request.body;
  console.log('server side data ', data)
  projectData["date"] = data.timezone;
  projectData["temp"] = data.temp;
  projectData["feel"] = data.feeling;
  console.log('server projectdata ', projectData)

  response.send(projectData);
  }
  
  
var standard_input = process.stdin;
const inquirer = require('inquirer')

// Set input character encoding.
standard_input.setEncoding('utf-8');
var commutersAxis = [];
var busLocationAxis = {x:0,y:0};
var destinationLocationAxis = {x:0,y:0};
var distance = 0.0;

commuterLocationInput();
function commuterLocationInput(){
    var questions = [{
        type: 'input',
        name: 'data',
        message: "Please input Commuters location as co-ordinates as X and Y axis, eg.input as (X,Y) :- 1,3 :-- ",
      }]
    
    // When user input data and click enter key.
    inquirer.prompt(questions).then(answers => {
        
          var axisData = answers['data'];
             var axisArr = axisData.toString().split(",");
             commutersAxis.push({x: axisArr[0], y: axisArr[1]});
             console.log('User Input Data : ' + JSON.stringify(commutersAxis));
             callCommuterRecursive();
      })
}


function callCommuterRecursive(){
    var questions1 = [{
        type: 'input',
        name: 'dataRecursive',
        message: "Need to input more commuter's ? type yes/no ",
      }]
    
    inquirer.prompt(questions1).then(answers => {
        if(answers['dataRecursive'] == "yes"){
            commuterLocationInput();
            
        }else if(answers['dataRecursive'] == "no"){
            console.log("CALL buslocation()");
            //TODO call the busLocationInput()
            busLocationInput();
        }else{
            console.log("Enter right input !");
            callCommuterRecursive();
        }

    });    
    
}



function busLocationInput(){
    var questions2 = [{
        type: 'input',
        name: 'busLocation',
        message: "Please input Bus location as co-ordinates as X and Y axis, eg.input as (X,Y) :- 1,3 :-- ",
      }]
    
    // When user input data and click enter key.
    inquirer.prompt(questions2).then(answers => {
        
          var axisData = answers['busLocation'];
             var axisArr = axisData.toString().split(",");
             busLocationAxis.x = axisArr[0]; 
             busLocationAxis.y = axisArr[1];
             console.log('User Input Data : ' + JSON.stringify(busLocationAxis));
             destinationLocationInput();
      })
}



function destinationLocationInput(){
    var questions3 = [{
        type: 'input',
        name: 'destinationLocation',
        message: "Please input destination location as co-ordinates as X and Y axis, eg.input as (X,Y) :- 1,3 :-- ",
      }]
    
    // When user input data and click enter key.
    inquirer.prompt(questions3).then(answers => {
        
          var axisData = answers['destinationLocation'];
             var axisArr = axisData.toString().split(",");
             destinationLocationAxis.x = axisArr[0]; 
             destinationLocationAxis.y = axisArr[1];
             console.log('User Input Data : ' + JSON.stringify(destinationLocationAxis));
             evaluateDistance();
      })
}

function evaluateDistance(){
    
    allignCommutersBusRouteWise().then((data)=>{
        //Calculating first distance between bus location and first on the way coming commuter's location
        distance+= getDistance(busLocationAxis.x, busLocationAxis.y, data[0].x, data[0].y);
        console.log("distance-->"+distance)
    });
}

function allignCommutersBusRouteWise(){
    return new Promise((resolve,reject)=>{
        //squared distance
        const sqDist = (pointa, pointb) => (pointa.x-pointb.x)**2+(pointa.y-pointb.y)**2;
        //sorting of commuters location as per bus location
        var sortedCommuterAxes = commutersAxis.sort((pointa, pointb) => sqDist(busLocationAxis,pointa)-sqDist(busLocationAxis,pointb));
        resolve(sortedCommuterAxes);
        console.log("allignCommutersBusRouteWise--->"+JSON.stringify(sortedCommuterAxes))
    });
}


//Calculating distance between two axis
function getDistance( x1, y1, x2, y2 ) {
	
	var xs = x2 - x1,
		ys = y2 - y1;		
	
	xs *= xs;
	ys *= ys;
	return Math.sqrt( xs + ys );
};
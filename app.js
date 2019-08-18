var standard_input = process.stdin;
const inquirer = require('inquirer')

// Set input character encoding.
standard_input.setEncoding('utf-8');
var commutersAxis = [];
var busLocationAxis = {x:0,y:0};
var destinationLocationAxis = {x:0,y:0};

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
    allignCommutersBusRouteWise();
}

function allignCommutersBusRouteWise(){

//squared distance
const sqDist = (pointa, pointb) => (pointa.x-pointb.x)**2+(pointa.y-pointb.y)**2;
//sorting
var sortedCommuterAxes = commutersAxis.sort((pointa, pointb) => sqDist(busLocationAxis,pointa)-sqDist(busLocationAxis,pointb));
 console.log("allignCommutersBusRouteWise--->"+JSON.stringify(sortedCommuterAxes))
}
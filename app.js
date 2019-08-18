var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');
var commutersAxis = [];

commuterLocationInput();
function commuterLocationInput(){
    console.log("Please input Commuters location as co-ordinates as X and Y axis, eg.input as (X,Y) :- 1,3 :-- ");
    // When user input data and click enter key.
    standard_input.on('data', function (data) {

            var axisData = data;
            var axisArr = axisData.toString().split(",");
            //handling if type yes not to push in arr
            if(data != "yes\r\n"){
                commutersAxis.push({x: axisArr[0], y: axisArr[1]});
            }
            
            // Print user input in console.
            console.log('User Input Data : ' + JSON.stringify(commutersAxis));
            callCommuterRecursive();
    });

}


function callCommuterRecursive(){
    console.log("Need to input more commuter's ? type yes/no")
    standard_input.on('data', function (data) {
            if(data == "yes\r\n"){
                commuterLocationInput();
                data = '';
            }else{
                console.log("CALL buslocation()");
                //TODO call the busLocationInput()
            }
    });
}
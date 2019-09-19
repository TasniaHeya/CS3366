var currentdisplayNo = 0;
var display1 = document.getElementById('display-1');
var display2 = document.getElementById('display-2');
var queue = new Array();
var currentFloor = 0;
var maxFloor = 60;
var started = false;
var goingUp = false;
var goingDown = false;
var floorTime = 1000;



$('#button-enter').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    // alert('enter');
    var selectFloor = $('#floor-input-box').val();
    if (selectFloor == null) {
        status("Invalid input");

    } else {
        addFloorToQueue(selectFloor);
    }

    return false;
});

$('#button-1').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('1');
    return false;
});

$('#button-2').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('2');
    return false;
});

$('#button-3').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('3');
    return false;
});

$('#button-4').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('4');
    return false;
});

$('#button-5').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('5');
    return false;
});

$('#button-6').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('6');
    return false;
});

$('#button-7').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('7');
    return false;
});

$('#button-8').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('8');
    return false;
});

$('#button-9').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber(9);
    return false;
});

$('#button-0').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    inputNumber('0');
    return false;
});

$('#button-clear-input').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    clearInput();
    speak("Input cleared");
    return false;
});

$('#button-emergency').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    // alert('emergency');
    status("Emergency");
    speak("Please Do not panic, help is on the way.");
    status("Emergency");
    speak("Please Do not panic, help is on the way.");
    status("Emergency");
    speak("Please Do not panic, help is on the way.");
    return false;
});

$('#button-open-door').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    // alert('open-door');
    openDoor();
    return false;
});

$('#button-close-door').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    // alert('close-door');
    closeDoor();
    return false;
});

$('#button-floor-info').click(function (e) {
    e.preventDefault();
    /*your_code_here;*/
    // alert('floor-info');
    speak("In this floor there are KFC, McDonalds and Starbucks");
    return false;
});


$('#floor-input-box').focus();
// Force focus
$('#floor-input-box').focusout(function () {
    $('#floor-input-box').focus();
});




// defined functions:

// simple basic functionality
function openDoor() {
    if (goingDown || goingUp) {
        status("Please wait.");
    } else {
        status("Doors Opening");
    }
}

function closeDoor() {
    if (goingDown || goingUp) {
        status("Please wait.");
    } else {
        status("Doors closing");
    }
}

function inputNumber(number) {
    //Get
    var existing = $('#floor-input-box').val();
    var newInput = existing + number;
    if (parseInt(newInput) < parseInt(maxFloor)) {
        //Set
        $('#floor-input-box').val(newInput);
    } else {
        var floorOffset = maxFloor - 1;
        status("Floor over " + floorOffset + " is invalid.");
    }


}

function clearInput() {
    $('#floor-input-box').val('');
}

function speak(statement) {
    responsiveVoice.speak(statement);
}

function showGoingUp() {
    $('#indicator-status').text('Up');
    $('#indicator-up').show();
    $('#indicator-down').hide();
    $('#indicator-up-blank').hide();
}

function showGoingDown() {
    $('#indicator-status').text('Down');
    $('#indicator-up').hide();
    $('#indicator-up-blank').show();
    $('#indicator-down').show();
}

function showFloorStall() {
    started = false;
    $('#indicator-status').text('');
    $('#indicator-up-blank').hide();
    $('#indicator-up').hide();
    $('#indicator-down').hide();
}

function status(statement) {
    speak(statement);
    // alert (statement);
    $('#status-display').text(statement);
    setTimeout(
        function () {
            $('#status-display').text('Current Floor');
        }, 5000);
}

function showQueue() {
    $('#queue-list').empty();
    var i;
    for (i = 0; i < queue.length; i++) {
        $('#queue-list').append('<li class="list-group-item">' + queue[i] + '</li>');
    }
}

function setDisplayFloor(floor) {
    var firstDigit, secondDigit;
    if (floor.toString().length == 1) {
        firstDigit = 0;
        secondDigit = floor.toString()[0];
    } else {
        firstDigit = floor.toString()[0];
        secondDigit = floor.toString()[1];
    }
    var baseClass = 'display-container display-size-12 display-no-';
    display1.className = baseClass + firstDigit;
    display2.className = baseClass + secondDigit;
}

function goDown() {
    showGoingDown();
    goingDown = true;
    goingUp = false;
    function f() {
        currentFloor--;
        setDisplayFloor(currentFloor);
        if (parseInt(currentFloor) > parseInt(queue[0])) {
            setTimeout(f, floorTime);
        } else if (parseInt(currentFloor) == parseInt(queue[0])) {
            reachedFloor();
        } else {
            // alert('should not reach this statement, but it did. 01');
        }
    }
    f();
}

function goUp() {
    showGoingUp();
    goingUp = true;
    goingDown = false;
    function f() {
        currentFloor++;
        setDisplayFloor(currentFloor);
        if (parseInt(currentFloor) < parseInt(queue[0])) {
            setTimeout(f, floorTime);
        } else if (parseInt(currentFloor) == parseInt(queue[0])) {
            reachedFloor();
        } else {
            // alert('should not reach this statement, but it did. 02');
        }
    }
    f();
}

//////////////////////////////////////////////////////////////////////// complex functions //////////////////////////////////////////////////////////////////////// 

function reachedFloor() {
    speak("Floor " + currentFloor);

    setTimeout(
        function () {

        }, 2500);

    goingDown = false;
    goingUp = false;
    openDoor();

    setTimeout(
        function () {
            closeDoor();
            console.log(queue);
            queue.shift();
            showQueue();
            start();

        }, 5000);
   
}


function addFloorToQueue(floor) {

    console.log("======call to addFloorToQueue");

    var statement = "";
    if (queue.includes(floor)) {
        console.log("======floor included");

        statement = "Floor " + floor + " selected.";
    } else if (floor == currentFloor) {
        console.log("======its in current floor");

        statement = "You are on floor " + floor;
    } else {
        queue.push(floor);

        console.log("======After first push queue: " + queue);

        statement = "Floor " + floor + " selected.";
    }

    speak(statement);
    $('#floor-input-box').val('');

    organizeQueueAndShow();
    if (!started) {
        start();
        started = true;
    }

}


function organizeQueueAndShow() {
    if (queue.length > 1) {
        if (goingUp && !goingDown) {
            //array sorting
            queue = queue.sort(function (a, b) { return a - b });

            console.log("======full queue sorted: " + queue);
            var ix = 0; var i = 0;
            for (ix = 0; ix < queue.length; ix++) {
                if (parseInt(queue[ix]) < parseInt(currentFloor)) {
                    // break;
                    i++;
                }
            }
            console.log("======Before slice i: " + i + ", current floor: " + currentFloor);
            var newQueue = queue.splice(0, i);
            console.log("======After slice new queue first half: " + queue);

            newQueue = newQueue.sort(function (a, b) { return b - a });
            console.log("======After slice new queue second half: " + newQueue);
            queue = queue.concat(newQueue);


            console.log("======going up final, queue: " + queue);

        } else if (!goingUp && goingDown) {
            queue = queue.sort(function (a, b) { return b - a });
            console.log("======full queue reverse sorted: " + queue);

            var ix = queue.length; var i = queue.length;
            for (ix = queue.length; ix > 0; ix--) {
                if (parseInt(queue[ix]) > parseInt(currentFloor)) {
                    i--;
                }
            }
            i--;

            console.log("======Before slice i: " + i + ", current floor: " + currentFloor);
            var newQueue = queue.splice(0, i);
            console.log("======After slice new queue first half: " + queue);

            newQueue = newQueue.sort(function (a, b) { return b - a });
            console.log("======After slice new queue second half: " + newQueue);

            queue = queue.concat(newQueue);

            console.log("======going down final, queue: " + queue);
        } else {
             console.log('should not reach this statement, but it did. 03 states of going up:' + goingUp + ', going down: ' + goingDown);
        }

    } else {
        // alert('should not reach this statement, but it did. 04');
    }

    showQueue();
}

function chooseToGoUpOrDown() {
    if (parseInt(queue[0]) > parseInt(currentFloor)) {
        goUp();
    } else if (parseInt(queue[0]) < parseInt(currentFloor)) {
        goDown();
    } else {
        showFloorStall();
    }
}


function start() {
    console.log("======call to start");
    if (queue.length == 0) {
        showFloorStall();
    } else if (queue.length == 1) {
        chooseToGoUpOrDown();
    } else if (queue.length > 1) {
        if (goingUp && !goingDown) {
            goingUp();
        } else if (!goingUp && goingDown) {
            goingDown();
        } else {
            chooseToGoUpOrDown();
        }
    }
}







showFloorStall();
setDisplayFloor(currentFloor);
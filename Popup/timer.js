// ** Timer Countdown

//TODO: Implement side arrow functionality

//Grab elements the timer will be using
let circle = document.getElementById('circle');
let btn = document.getElementById('butt');
let hrsPlus = document.getElementById('up');
let hrsMinus = document.getElementById('down');

//Initialise timer values
let hours = 0;
let minutes = 0;
let seconds = 0;

let myTimer = null;
let stop = false;
btn.innerHTML = 'start';

// Add or remove minutes to the timer
function minutesPlus() {
	if (minutes >= 50) {
		minutes = 0;
		hours++;
	} else {
		minutes += 10;
	}
}

function minutesMinus() {
	if (minutes <= 0) {
		minutes = 50;
		hoursMinus();
	} else {
		minutes -= 10;
	}
}

function hoursMinus() {
	if (hours > 0) {
		hours--;
	}
}

//timer selection event listeners
hrsPlus.addEventListener('click', function() {
	console.log('hello');
	minutesPlus();
	circle.innerHTML = '<h2 id ="clock" style="color:white">' + hours + 'h &puncsp; ' + minutes + 'm' + '</h2>';
});
hrsMinus.addEventListener('click', function() {
	console.log('hello');
	minutesMinus();
	circle.innerHTML = '<h2 id ="clock" style="color:white">' + hours + 'h &puncsp;' + minutes + 'm' + '</h2>';
});

// start/stop timer
// sends message with relevant values to background timer scripts

btn.addEventListener('click', function() {
	if (!stop) {
		chrome.runtime.sendMessage({
			timerStart: true,
			minutes: minutes,
			hours: hours,
			seconds: seconds
		});
	} else {
		btn.innerHTML = 'start';
		stop = false;
		seconds = 0;
		minutes = 0;
		hours = 0;
		chrome.runtime.sendMessage({
			timerStop: true,
			timerId: myTimer
		});
	}
});

//Listens for values from background script
chrome.runtime.onMessage.addListener(function(message, sender) {
	if (!message.background) return;
	myTimer = message.timerId;
	stop = true;
	console.log(myTimer);
	btn.innerHTML = 'stop';
	if ((message.minutes > 0 || message.seconds > 0) && message.hours === 0) {
		circle.innerHTML = '<h2 id="clock" style="color:white">' + message.minutes + 'm ' + message.seconds + 's </h2>';
	} else {
		circle.innerHTML = '<h2 id="clock" style="color:white">' + message.hours + 'h ' + message.minutes + 'm </h2>';
	}
});

//** A script that de-increments the timer.

//TODO: Refactor this into two "start/stop" scripts

chrome.runtime.onMessage.addListener(function(message, sender) {
	//Check that message sent was intended for this script
	if (!message.timer) return;
	if (message.status) {
		let seconds = message.seconds;
		let minutes = message.minutes;
		let hours = message.hours;

		//every 1000ms, incrementally decrease timer and update html
		let myTimer = window.setInterval(callback, 1000);
		function callback() {
			seconds--;
			if (minutes <= 0) {
				if (hours > 0) {
					minutes = 59;
					hours--;
					seconds = 59;
				}
			}
			if (seconds < 0) {
				if (minutes > 0) {
					seconds = 59;
					minutes--;
				}
			}
			//Send updated values to browser to display
			chrome.runtime.sendMessage({
				background: true,
				minutes: minutes,
				hours: hours,
				seconds: seconds,
				timerId: myTimer
			});
		}
	} else {
		window.clearInterval(message.timerId);
	}
});

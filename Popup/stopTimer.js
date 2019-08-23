chrome.runtime.onMessage.addListener(function(message, sender) {
	//Check that message sent was intended for this script
	if (!message.timerStop) return;
	console.log(message.timerId);
	window.clearInterval(message.timerId);
});

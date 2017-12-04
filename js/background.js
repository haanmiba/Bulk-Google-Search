chrome.runtime.onMessage.addListener(function(msg) {
	/*
	var data = msg;
	for (var i = 0; i < data.length; i++) {
		if (data[i] != "") {
			window.open('https://www.google.com/search?q=' + encodeHTML(data[i]), '_blank');
		}
	}*/
	

	
	
	var jsonData = JSON.parse(msg);
	var data = jsonData.queries;

	/*
			var urlToOpen = jsonData.website.split('~query~').join(encodeHTML(data[0]));
			alert(urlToOpen);
			window.open(urlToOpen, '_blank');	*/		

	for (var i = 0; i < data.length; i++) {
		if (data[i] != "") {
			var urlToOpen = jsonData.website.split('~query~').join(encodeHTML(data[i]));
			window.open(urlToOpen, '_blank');			
		}
	}

	/*
	for (var i = 0; i < data.length; i++) {
		if (data[i] != "") {
			var urlToOpen = jsonData.website.split('~query~').join(encodeHTML(data[i]));
			window.open(urlToOpen, '_blank');			
		}
	}*/
});

// Converts str special characters (+, -, #, $, ...) to hex for searching. Example: 'C++' will become 'C%2B%2B'
function encodeHTML(str) {

	// Create an empty string we will be appending to
	var retVal = "";

	// Scan through the str
	for (var i = 0; i < str.length; i++) {

		// Get the decimal character code of every single character in str
		var dCharCode = str[i].charCodeAt();

		// If the decimal character code is a non-letter, non-number character (according to ASCII), convert it to hex
		if (dCharCode < 65 || dCharCode > 127 || (dCharCode > 90 && dCharCode < 97)) {
			retVal += ('%' + str[i].charCodeAt().toString(16));
		} else { // Else, just append the regular character to our retVal without modification
			retVal += str[i];
		}
	}

	// Return our retVal. A string now optimal for searching.
	return retVal;
}
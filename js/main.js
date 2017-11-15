// numQueries corresponds with the current number of quieries on the popup
var numQueries = 0;

// When the page loads, initialize the event handlers for our buttons at the bottom of the popup window
window.addEventListener("load", initializeEventListeners);

// Initialize event handlers and initialize local storage
function initializeEventListeners() {

	// STARTING STATE: If our local storage does not contain a JSON array called queries, initialize it.
	if (localStorage.getItem('queries') === null) {

		// Initialize our local storage
		initializeLocalStorage();

		// Add a single search query
		addSearchQuery();
	} else { // Else, a JSON array called queries already exists

		// Retrieve our JSON array quieries. Our JSON array saves the current state of our program even after it is closed.
		var queries = JSON.parse(localStorage.getItem('queries'));

		// numQueries is assigned to the number of entries in our JSON array most recently saved to our local storage.
		numQueries = queries.length;

		// Display our inputs
		displayInputs();
	}

	// Map the buttons on the popup window to their functions
	document.getElementById('addSearchButton').addEventListener("click", addSearchQuery);
	document.getElementById('searchAllButton').addEventListener("click", searchAll);
	document.getElementById('clearAllButton').addEventListener("click", clearAll);
	document.getElementById('deleteAllButton').addEventListener("click", deleteAll);
	document.getElementById('addNumMoreSearchesButton').addEventListener("click", addNumMoreSearchQueries);	
}

// Create an empty array and set it to our local storage. Initializes or "resets" our local storage.
function initializeLocalStorage() {

	// Create empty array
	var queries = [];

	// Set 'queries' in local storage to the empty array
	localStorage.setItem('queries', JSON.stringify(queries));
}

// Saves the current state of our program
function saveState() {

	// Get the current state of the program based upon the values inside of the text inputs.
	var queries = getLocalStorage();

	// Set 'queries' in local storage to this current array.
	localStorage.setItem('queries', JSON.stringify(queries));
}

// Add a single text input to our popup window.
function addSearchQuery() {

	// Get the current state of the program.
	var queries = getLocalStorage();

	// Push "" at the end of our JSON array.
	queries.push("");

	// Set 'queries' in local storage to this array with "" pushed at the end.
	localStorage.setItem('queries', JSON.stringify(queries));

	// Increment numQueries
	numQueries++;

	// Display the outcome of adding this new text input.
	displayInputs();
}

// Returns an array containing the values of any text currently in the text inputs.
function getLocalStorage() {

	// Create an empty array.
	var retVal = [];

	// Add to that array all of the values from the text inputs.
	for (var i = 0; i < numQueries; i++) {
		retVal.push(document.getElementById('search' + i).value);
	}

	// Return the array.
	return retVal;
}

// Searches all of the entries.
function searchAll() {
	var queries = JSON.parse(localStorage.getItem('queries'));
	for (var i = 0; i < queries.length; i++) {
		if (queries[i] != "") {
			window.open('https://www.google.com/search?q=' + encodeHTML(queries[i]), '_blank');
		}
	}
	
}

// Clears all of our inputs.
function clearAll() {
	for (var i = 0; i < numQueries; i++) {
		clearQuery(i);
	}
}

// "Resets" the state of our program back to the original – single text input, and an empty queries in our local storage.
function deleteAll() {

	// Reset local storage.
	initializeLocalStorage();

	// Set numQueries back to 0.
	numQueries = 0;

	// Add a single text input to our program.
	addSearchQuery();
}

// Add any more number of search queries.
function addNumMoreSearchQueries() {

	// Retrieve the number of text inputs the user requests to add.
	var num = parseInt(document.getElementById('numMoreQuries').value);

	// Clear the number input to add more text inputs
	document.getElementById('numMoreQuries').value = "";

	// Loop through and add num more search queries
	for (var i = 0; i < num; i++) {
		addSearchQuery();
	}
	//numQueries += num;
	//displayInputs();
}

// Set the popup window to display the correct number of text inputs in their correct states.
function displayInputs() {

	// Clear the div tag allForms
	allForms.innerHTML = "";

	// Add in numQueries number of text inputs with their corresponding search, clear, and delete buttons
	for (var i = 0; i < numQueries; i++) {
		allForms.innerHTML +=	'<div id="well"><h5>Search ' + (i+1) + ':</h5>' + 
								'<input type="text" id="search' + i + '" placeholder="Search" tabindex=' + (i+1) + '>' + 
								'<a id="searchButton' + i + '" class="btn btn-success" href="#">Search</a>' + 
								'<a id="clearButton' + i + '" class="btn btn-warning" href="#">Clear</a>' + 
								'<a id="deleteButton' + i + '" class="btn btn-danger" href="#">Delete</a>' + 
								'</div>';
	}

	// Set the correct text in the text inputs and add event listeners to all the text inputs and buttons.
	for (var j = 0; j < numQueries; j++) {
		setInputs(j);
		addEvents(j);
	}

}

// Sets the text within the text inputs based upon the state of the program before it was altered.
function setInputs(num) {

	// Retrieve our queries from local storage.
	var queries = JSON.parse(localStorage.getItem('queries'));

	// Set the corresponding text input with the value it had before modification.
	if (queries[num] != "") {
		document.getElementById('search' + num).value = queries[num];
	}
}

// Add event listeners to our text inputs and the buttons associated with them.
function addEvents(num) {

	// Have it so the program saves the state of itself every time there is an input in any text input.
	document.getElementById('search' + num).addEventListener("input", saveState);

	// Have the program search whatever is in the text input when they click on the search button.
	document.getElementById('searchButton' + num).addEventListener("click", function() {
		searchQuery(num);
	});

	// Have the program clear whatever is in the text input when they click on the clear button.
	document.getElementById('clearButton' + num).addEventListener("click", function() {
		clearQuery(num);
	});

	// Have the program delete the text input when they click on the delete button.
	document.getElementById('deleteButton' + num).addEventListener("click", function() {
		deleteQuery(num);
	});
}

// Perform a google search.
function searchQuery(num) {

	// Save the current state of the program.
	saveState();

	// Retrieve the value from a text input.
	var query = document.getElementById('search' + num).value;

	// If the value is blank or empty, don't do anything.
	if (query == "") {
		return false;
	}

	// Create the URL we will be going to.
	var url = 'https://google.com/search?q=' + encodeHTML(query);

	// Open this URL in another page.
	window.open(url, '_blank');
}


// Clear a text input.
function clearQuery(num) {
	// Set the text input's value to blank/empty.
	document.getElementById('search' + num).value = "";

	// Save the current state of our program.
	saveState();
}

// Delete a text input.
function deleteQuery(num) {

	// Create an empty array
	var queries = [];

	// For every text input that is not being deleted, push to this array the values within those text inputs.
	for (var i = 0; i < numQueries; i++) {
		if (i != num) {
			queries.push(document.getElementById('search' + i).value);
		} else {
			queries.push("");
		}
	}

	// Set this array to our local storage.
	localStorage.setItem('queries', JSON.stringify(queries));

	// Decrement the number of queries.
	numQueries--;

	// If the user tries to empty the popup window, have it so there is always at least one text input on the popup window.
	if (numQueries == 0) {
		addSearchQuery();
		return true;
	}

	// Update the popup window.
	displayInputs();
}

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
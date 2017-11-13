/***********************NON-EXTENSION VERSION******************
var numQueries = 0;

// Searches something based upon what is inside of the input
function searchSomething(id) {
	// Get the value from the id
	var query = document.getElementById(id).value;

	// If the value is blank, don't do anything.
	if (query == "") {
		return false;
	}

	// Create the google search URL to be opened
	var url = 'https://google.com/search?q=' + query;

	// Open the URL in a new tab
	window.open(url, '_blank');
}

// Adds another search query to the form
function addSearchQuery() {
	var queryArr = saveCurrentQueries();
	numQueries++;
	refreshQueries(queryArr);
}

function addNumMoreSearchQueries() {
	var num = parseInt(document.getElementById('numMoreQuries').value);
	document.getElementById('numMoreQuries').value = "";
	var queryArr = saveCurrentQueries();
	numQueries += num;
	refreshQueries(queryArr);
}

function clearSearchQuery(num) {
	document.getElementById('search' + (num+1)).value = "";
}

function deleteSearchQuery(num) {
	if (numQueries == 1) {
		return false;
	}
	var queryArr = saveCurrentQueries();
	queryArr.splice(num, 1);
	numQueries--;
	refreshQueries(queryArr);
}

function saveCurrentQueries() {
	var arr = new Array();
	for (var i = 0; i < numQueries; i++) {
		arr.push(document.getElementById('search' + (i+1)).value);
	}
	return arr;
}

function searchAll() {
	for (var i = 0; i < numQueries; i++) {
		searchSomething('search' + (i+1));
	}
}

function refreshQueries(arr) {

	allForms.innerHTML = "";

	for (var i = 0; i < numQueries; i++) {

	allForms.innerHTML +=	'<div class="well">' + 
							'<h5>Search ' + (i+1) +  ':</h5>' + 
							'<input type="text" id="search' + (i+1) + '" placeholder="Search">' +
							'<a onclick="searchSomething(\'search'+(i+1)+'\')" class="btn btn-default query" href="#">Search</a>' + 
							'<a onclick="clearSearchQuery(' + i + ')" class="btn btn-warning" href="#">Clear</a>' +
							'<a onclick="deleteSearchQuery(' + i + ')" class="btn btn-danger" href="#">Delete</a>' + 
							'</div>';

	}

	for (var i = 0; i < numQueries; i++) {
		if (arr[i] != null) {
					document.getElementById('search' + (i+1)).value = arr[i];
		}
	}

}

function clearAll() {
		for (var i = 0; i < numQueries; i++) {
			document.getElementById('search' + (i+1)).value = "";
	}

}

function deleteAll() {
	numQueries = 1;
	refreshQueries();
}*/

//document.getElementById('myForm').addEventListener('submit', search);

var numQueries = 0;

window.addEventListener("load", function(){
	loadEventListeners();
	addSearchQuery();
});

function loadEventListeners() {
	document.getElementById('addSearchButton').addEventListener("click", addSearchQuery);
	document.getElementById('searchAllButton').addEventListener("click", searchAll);
	document.getElementById('clearAllButton').addEventListener("click", clearAll);
	document.getElementById('deleteAllButton').addEventListener("click", deleteAll);
	document.getElementById('addNumMoreSearchesButton').addEventListener("click", addNumMoreSearchQueries);
}

// Adds another search query to the form
function addSearchQuery() {
	var queryArr = saveCurrentQueries();
	numQueries++;
	refreshQueries(queryArr);
}

function addNumMoreSearchQueries() {
	var num = parseInt(document.getElementById('numMoreQuries').value);
	document.getElementById('numMoreQuries').value = "";
	var queryArr = saveCurrentQueries();
	numQueries += num;
	refreshQueries(queryArr);
}

function refreshQueries(arr) {

	allForms.innerHTML = "";

	for (var i = 0; i < numQueries; i++) {

	allForms.innerHTML +=	'<div class="well">' + 
							'<h5>Search ' + (i+1) +  ':</h5>' + 
							'<input type="text" id="search' + (i) + '" placeholder="Search">' +
							'<a id="searchButton' + (i) + '" class="btn btn-default query" href="#">Search</a>' + 
							'<a id="clearButton' + (i) + '" class="btn btn-warning" href="#">Clear</a>' +
							'<a id="deleteButton' + (i) + '" class="btn btn-danger" href="#">Delete</a>' + 
							'</div>';

	}

	for (var i = 0; i < numQueries; i++) {

		if (arr[i] != null) {
			document.getElementById('search' + (i)).value = arr[i];
		}

		document.getElementById('searchButton' + (i)).addEventListener("click", function() {
			searchSomething(i);
		});
		console.log('Adding event listener to searchButton' + (i) + ' to search: search' + (i)); 

		document.getElementById('clearButton' + (i)).addEventListener("click", function() {
			clearSearchQuery(i);
		});

		document.getElementById('deleteButton' + (i)).addEventListener("click", function() {
			deleteSearchQuery(i);
		});

	}

}

// Searches something based upon what is inside of the input
function searchSomething(num) {

	// Get the value from the id
	var query = document.getElementById('search' + (num-1)).value;

	// If the value is blank, don't do anything.
	if (query == "") {
		return false;
	}

	// Create the google search URL to be opened
	var url = 'https://google.com/search?q=' + query;

	// Open the URL in a new tab
	window.open(url, '_blank');
}

function clearSearchQuery(num) {
	document.getElementById('search' + (num+1)).value = "";
}

function deleteSearchQuery(num) {
	if (numQueries == 1) {
		return false;
	}
	var queryArr = saveCurrentQueries();
	queryArr.splice(num, 1);
	numQueries--;
	refreshQueries(queryArr);
}

function saveCurrentQueries() {
	var arr = new Array();
	for (var i = 0; i < numQueries; i++) {
		arr.push(document.getElementById('search' + (i)).value);
	}
	return arr;
}

function searchAll() {
	for (var i = 0; i < numQueries; i++) {
		console.log('searchSomething(' + i + ')');
		searchSomething((i+1));
	}
}

function clearAll() {
		for (var i = 0; i < numQueries; i++) {
			document.getElementById('search' + (i)).value = "";
	}

}

function deleteAll() {
	numQueries = 1;
	refreshQueries();
}
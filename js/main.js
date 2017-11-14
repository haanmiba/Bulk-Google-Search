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

//                       W/O SAVING STATE
/*
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

function testPrint(t) {
	console.log('search' + t);
}

function refreshQueries(arr) {

	allForms.innerHTML = "";

	for (var i = 0; i < numQueries; i++) {

		testPrint(i);

	allForms.innerHTML +=	'<div class="well">' + 
							'<h5>Search ' + (i+1) +  ':</h5>' + 
							'<input type="text" id="search' + (i) + '" placeholder="Search">' +
							'<a id="searchButton' + (i) + '" class="btn btn-success query" href="#">Search</a>' + 
							'<a id="clearButton' + (i) + '" class="btn btn-warning" href="#">Clear</a>' +
							'<a id="deleteButton' + (i) + '" class="btn btn-danger" href="#">Delete</a>' + 
							'</div>';


	}

	for (var i = 0; i < numQueries; i++) {

		if (arr[i] != null) {
			document.getElementById('search' + (i)).value = arr[i];
		}

		var num = i;

		document.getElementById('searchButton' + (num)).addEventListener("click", function() {
			console.log('searchSomething(' + num + ')');
			searchSomething(num);
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

	console.log("Searching for search tag with " + num);

	// Get the value from the id
	var query = document.getElementById('search' + (num-1)).value;
	console.log(document.getElementById('search' + (num-1)).value);
	console.log(query);

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
}*/

/*
var numQueries = 0;

// When the page loads,
window.addEventListener("load", function() {
	console.log("loaded!");
	initializeEventListeners();
	addSearchQuery();
});

function initializeEventListeners() {
	if (localStorage.getItem('queries') === null) {
		initializeLocalStorage();
	}
	document.getElementById('addSearchButton').addEventListener("click", addSearchQuery);
	document.getElementById('searchAllButton').addEventListener("click", searchAll);
	document.getElementById('clearAllButton').addEventListener("click", clearAll);
	document.getElementById('deleteAllButton').addEventListener("click", deleteAll);
	document.getElementById('addNumMoreSearchesButton').addEventListener("click", addNumMoreSearchQueries);	
}

function initializeLocalStorage() {
	var queries = [];
	localStorage.setItem('queries', JSON.stringify(queries));
}

function addSearchQuery() {
	numQueries++;
	testInitialize(numQueries);
}

function searchAll() {
	for (var i = 0; i < numQueries; i++) {
		searchQuery(i);
	}
}

function clearAll() {
	for (var i = 0; i < numQueries; i++) {
		clearQuery(i);
	}
}

function deleteAll() {
	for (var i = 0; i < numQueries; i++) {
		deleteQuery(i);
	}
}

function addNumMoreSearchQueries() {
	var num = parseInt(document.getElementById('numMoreQuries').value);
	document.getElementById('numMoreQuries').value = "";
	numQueries += num;
	testInitialize(numQueries);
}

function testInitialize(num) {

	allForms.innerHTML = "";

	for (var i = 0; i < num; i++) {
		allForms.innerHTML +=	'<div id="myQuery"><h3>Search ' + (i+1) + ':</h3>' + 
								'<input type="text" id="search' + i + '" placeholder="Search">' + 
								'<a id="searchButton' + i + '" class="btn btn-success" href="#">Search</a>' + 
								'<a id="clearButton' + i + '" class="btn btn-warning" href="#">Clear</a>' + 
								'<a id="deleteButton' + i + '" class="btn btn-danger" href="#">Delete</a>' + 
								'</div>';


	}

	for (var j = 0; j < num; j++) {
		addEvents(j);
	}

}

function addEvents(num) {

	document.getElementById('searchButton' + num).addEventListener("click", function() {
		searchQuery(num);
	});

	document.getElementById('clearButton' + num).addEventListener("click", function() {
		clearQuery(num);
	});

	document.getElementById('deleteButton' + num).addEventListener("click", function() {
		deleteQuery(num);
	});
}

function searchQuery(num) {
	console.log("Searching " + num);
	console.log(document.getElementById('search' + num).value);
	var query = document.getElementById('search' + num).value;
	if (query == "") {
		return false;
	}
	var url = 'https://google.com/search?q=' + query;
	window.open(url, '_blank');
}

function clearQuery(num) {
	console.log("Clearing " + num);
	document.getElementById('search' + num).value = "";
}

function deleteQuery(num) {
	console.log("Deleting " + num);
	numQueries--;
	if (numQueries == 0) {
		numQueries = 1;
		testInitialize(numQueries);
	}
	testInitialize(numQueries);
}
*/

var numQueries = 0;

// When the page loads,
window.addEventListener("load", function() {
	initializeEventListeners();
});

//window.setInterval(saveState, 100);

function initializeEventListeners() {
	if (localStorage.getItem('queries') === null) {
		initializeLocalStorage();
		addSearchQuery();
	} else {
		var queries = JSON.parse(localStorage.getItem('queries'));
		numQueries = queries.length;
		testInitialize();
	}
	document.getElementById('addSearchButton').addEventListener("click", addSearchQuery);
	document.getElementById('searchAllButton').addEventListener("click", searchAll);
	document.getElementById('clearAllButton').addEventListener("click", clearAll);
	document.getElementById('deleteAllButton').addEventListener("click", deleteAll);
	document.getElementById('addNumMoreSearchesButton').addEventListener("click", addNumMoreSearchQueries);	
}

function initializeLocalStorage() {
	var queries = [];
	localStorage.setItem('queries', JSON.stringify(queries));
}

function saveState() {
	var queries = getLocalStorage();
	localStorage.setItem('queries', JSON.stringify(queries));
}

function addSearchQuery() {

	var queries = getLocalStorage();
	queries.push("");
	localStorage.setItem('queries', JSON.stringify(queries));

	numQueries++;
	testInitialize();
}

function getLocalStorage() {

	var retVal = [];

	for (var i = 0; i < numQueries; i++) {
		retVal.push(document.getElementById('search' + i).value);
	}

	return retVal;
}

function searchAll() {
	for (var i = 0; i < numQueries; i++) {
		searchQuery(i);
	}
}

function clearAll() {
	for (var i = 0; i < numQueries; i++) {
		clearQuery(i);
	}
}

function deleteAll() {
	initializeLocalStorage();
	numQueries = 0;
	addSearchQuery();
}

function addNumMoreSearchQueries() {
	var num = parseInt(document.getElementById('numMoreQuries').value);
	document.getElementById('numMoreQuries').value = "";
	for (var i = 0; i < num; i++) {
		addSearchQuery();
	}
	//numQueries += num;
	testInitialize();
}

function testInitialize() {

	var queries = JSON.parse(localStorage.getItem('queries'));

	allForms.innerHTML = "";

	for (var i = 0; i < numQueries; i++) {
		allForms.innerHTML +=	'<div id="well"><h5>Search ' + (i+1) + ':</h5>' + 
								'<input type="text" id="search' + i + '" placeholder="Search">' + 
								'<a id="searchButton' + i + '" class="btn btn-success" href="#">Search</a>' + 
								'<a id="clearButton' + i + '" class="btn btn-warning" href="#">Clear</a>' + 
								'<a id="deleteButton' + i + '" class="btn btn-danger" href="#">Delete</a>' + 
								'</div>';


	}


	for (var j = 0; j < numQueries; j++) {
		setInputs(j);
		addEvents(j);
	}

}

function setInputs(num) {
	var queries = JSON.parse(localStorage.getItem('queries'));
	if (queries[num] != "") {
		document.getElementById('search' + num).value = queries[num];
	}
}

function addEvents(num) {

	document.getElementById('search' + num).addEventListener("input", saveState);

	document.getElementById('searchButton' + num).addEventListener("click", function() {
		searchQuery(num);
	});

	document.getElementById('clearButton' + num).addEventListener("click", function() {
		clearQuery(num);
	});

	document.getElementById('deleteButton' + num).addEventListener("click", function() {
		deleteQuery(num);
	});
}

function searchQuery(num) {
	var queries = getLocalStorage();
	localStorage.setItem('queries', JSON.stringify(queries));

	var query = document.getElementById('search' + num).value;
	if (query == "") {
		return false;
	}
	var url = 'https://google.com/search?q=' + query;
	window.open(url, '_blank');
}

function clearQuery(num) {
	document.getElementById('search' + num).value = "";

	var queries = getLocalStorage();
	localStorage.setItem('queries', JSON.stringify(queries));
}

function deleteQuery(num) {
	console.log("Deleting " + num);

	var queries = [];
	for (var i = 0; i < numQueries; i++) {
		if (i != num) {
			queries.push(document.getElementById('search' + i).value);
		}
	}
	localStorage.setItem('queries', JSON.stringify(queries));

	numQueries--;
	if (numQueries == 0) {
		numQueries = 1;
		testInitialize();
	}
	testInitialize();
}
